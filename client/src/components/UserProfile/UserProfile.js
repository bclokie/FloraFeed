import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import PlantDetails from "../PlantDetails/PlantDetails";
import { Avatar, Box, Typography, Grid, Paper } from "@mui/material";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ ...userData, userAvatar: userData.avatarUrl });
      } else {
        console.log("No such user!");
      }
    };

    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(postsQuery);
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        userPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(userPosts);
    };

    fetchUser();
    fetchPosts();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(135deg, #E8F8F2 0%, #D3F1E7 100%)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: colors.lightGreen1,
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
        }}
      >
        <Avatar
          src={user.avatarUrl}
          alt={`${user.userName}'s avatar`}
          sx={{
            width: 100,
            height: 100,
            borderColor: colors.green1,
            borderWidth: 2,
            borderStyle: "solid",
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginTop: 2, color: colors.green1 }}
        >
          {user.userName}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginTop: 1, color: colors.green2 }}
        >
          {user.firstName} {user.lastName}
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PlantDetails user={user} plant={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserProfile;
