import React, { useState, useEffect } from "react";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";
import PlantDetails from "../PlantDetails/PlantDetails";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Paper,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

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
    };

    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  }));

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Avatar
              src={user.userAvatar}
              alt={`${user.userName}'s avatar`}
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <StyledPaper>
              <Typography variant="h4" component="div">
                {user.userFirstName} {user.userLastName}
              </Typography>
              <Typography variant="subtitle1" color="inherit">
                @{user.userName}
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="div">
          Posts <Chip label={posts.length} />
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => handleOpen(post)}>
                  <CardMedia
                    component="img"
                    src={post.plant.imageUrl}
                    alt={post.plant.name}
                    loading="lazy"
                    height="400"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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
    </Container>
  );
};

export default UserProfile;
