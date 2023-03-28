import React, { useState, useEffect } from "react";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";
import PlantDetails from "../PlantDetails/PlantDetails";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Modal,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UserProfileSkeleton from "./UserProfileSkeleton";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#96BCA7",
    lightGreen2: "#DAE1D8",
  };

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserData();
      const currentUser = users.find((user) => user.userId === userId);

      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("No such user!");
      }

      const usersWithPosts = await fetchPostsData(users);
      const currentUserWithPosts = usersWithPosts.find(
        (user) => user.userId === userId
      );

      if (currentUserWithPosts) {
        setPosts(currentUserWithPosts.posts);
      } else {
        console.log("No posts found for this user!");
      }

      setLoading(false);
    };

    fetchData();
  }, [userId]);

  return (
    <Container>
      {loading ? (
        <>
          <UserProfileSkeleton />
        </>
      ) : (
        <>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Card
              sx={{
                position: "relative",
                marginTop: "75px",
                overflow: "visible",
                borderRadius: 10,
                boxShadow: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "75px",
                }}
              >
                <Avatar
                  src={user.userAvatar}
                  alt={`${user.userName}'s avatar`}
                  sx={{
                    borderTop: `solid 3px ${colors.green2}`,
                    borderBottom: "none",
                    borderLeft: `solid 3px ${colors.green2}`,
                    borderRight: `solid 3px ${colors.green2}`,
                    width: 150,
                    height: 150,
                    position: "absolute",
                    top: "-75px",
                    zIndex: 1,
                  }}
                />
              </Box>
              <CardContent>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      mt: 1,
                      color: colors.green1,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {user.userFirstName} {user.userLastName}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    @{user.userName}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mt: 8,
              color: colors.green1,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: "bold",
            }}
          >
            Posts{" "}
            <Chip
              sx={{
                backgroundColor: `${colors.green2}`,
                color: `${colors.white}`,
              }}
              label={posts.length}
            />
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Card
              sx={{
                borderRadius: 10,
              }}
            >
              <CardContent>
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={1}>
                    {posts.map((post) => (
                      <Grid item key={post.id} xs={12} sm={12} md={12} lg={4}>
                        <Card sx={{ boxShadow: 3, position: "relative" }}>
                          <CardActionArea onClick={() => handleOpen(post)}>
                            <CardMedia
                              component="img"
                              src={post.plant.imageUrl}
                              alt={post.plant.name}
                              loading="lazy"
                              height="400"
                            />
                          </CardActionArea>

                          <Box
                            sx={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              backgroundColor: colors.green2,
                              borderRadius: "50%",
                              zIndex: 2,
                            }}
                          >
                            <IconButton>
                              <CameraAltIcon
                                onClick={() => handleOpen(post)}
                                sx={{ color: "#fff" }}
                              />
                            </IconButton>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
          {selectedPost && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="plant-details-modal"
              aria-describedby="plant-details"
            >
              <PlantDetails user={user} plant={selectedPost.plant} />
            </Modal>
          )}
        </>
      )}
    </Container>
  );
};

export default UserProfile;
