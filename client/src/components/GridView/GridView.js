import React, { useEffect, useState } from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import Grid from "@mui/material/Grid";
import { fetchUserData, fetchPostsData, fetchUser } from "../../dataFetcher";
import { Container, Card, CardContent, Box, Typography } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import GridViewIcon from "@mui/icons-material/GridView";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

const GridView = () => {
  let [usersData, setUsersData] = useState([]);
  let [currentUser, setCurrentUser] = useState();
  let [favourites, setFavourites] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserData();
      const usersWithPosts = await fetchPostsData(users);
      setUsersData(usersWithPosts);
    };
    fetchData();
    fetchUser().then((user) => {
      setFavourites(user.favourites);
    });
  }, []);

  return (
    <Container maxWidth disableGutters>
      <Box
        sx={{
          marginLeft: 2,
          marginRight: 0,
          marginBottom: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            marginBottom: 1,
            width: "160px",
            height: "65px",
            mt: 1,
            borderRadius: 10,
            minWidth: "160px",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 0,
              }}
            >
              <GridViewIcon sx={{ marginRight: 1, color: colors.green1 }} />
              <Typography
                sx={{
                  fontSize: 22,
                  fontFamily: "'Nunito', sans-serif;",
                  fontWeight: 700,
                  color: colors.green1,
                }}
              >
                Discover
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
        {usersData.length > 0 &&
          usersData.map((user) =>
            user.posts.map((post) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={post.id}>
                <PlantDetails
                  user={{
                    userName: user.userName,
                    userAvatar: user.userAvatar,
                  }}
                  plant={post.plant}
                  favourites={favourites ? favourites : []}
                  id={post.id}
                />
              </Grid>
            ))
          )}
      </Grid>
    </Container>
  );
};

export default GridView;
