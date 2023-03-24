import React, { useState, useEffect } from "react";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";
import PlantDetails from "../PlantDetails/PlantDetails";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [lastPostImage, setLastPostImage] = useState("");

  const theme = useTheme();

  const StyledPaper = styled(Paper)({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
  });

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserData();
      const currentUser = users.find((user) => user.userId === userId);

      if (currentUser) {
        setUser({
          userId: currentUser.userId,
          userFirstName: currentUser.userFirstName,
          userLastName: currentUser.userLastName,
          userName: currentUser.userName,
          userAvatar: currentUser.userAvatar,
        });
      } else {
        console.log("No such user!");
      }

      const usersWithPosts = await fetchPostsData(users);
      const currentUserWithPosts = usersWithPosts.find(
        (user) => user.userId === userId
      );

      if (currentUserWithPosts) {
        setPosts(currentUserWithPosts.posts);
        setLastPostImage(
          currentUserWithPosts.posts[currentUserWithPosts.posts.length - 1]
            .imageUrl
        );
      } else {
        console.log("No posts found for this user!");
      }
    };

    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        py: 5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "40%",
          backgroundImage: `url(${lastPostImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          filter: "brightness(60%)",
        }}
      />
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Avatar
              src={user.userAvatar}
              alt={`${user.userName}'s avatar`}
              sx={{
                width: 100,
                height: 100,
                borderColor: "#c7c7c7",
                borderWidth: 2,
                borderStyle: "solid",
                display: "block",
                mx: "auto",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#262626",
                marginBottom: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {user.userFirstName} {user.userLastName}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "normal",
                color: "#262626",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              @{user.userName}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#262626",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Posts: {posts.length}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* Add any additional user details here */}
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PlantDetails user={user} plant={post.plant} />
            </Grid>
          ))}
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default UserProfile;
