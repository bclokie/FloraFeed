import React, { useEffect, useState } from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import Grid from "@mui/material/Grid";
import {
  fetchUserData,
  fetchPostsData,
  fetchUserFavourites,
  fetchUser,
  createPosts,
  getPostById,
} from "../../dataFetcher";
import { Container, Card, CardContent, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

let authorUsername;
const FavouritesView = () => {
  let [currentUser, setCurrentUser] = useState();
  let [favourites, setFavourites] = useState([]);
  let [postData, setPostData] = useState([]);
  let [favouritesArray, setFavouritesArray] = useState([]);
  const [posterUsername, setPosterUsername] = useState();
  useEffect(() => {
    fetchUser().then((user) => {
      setFavouritesArray([...user.favourites]);
      setCurrentUser(user);
      fetchUserFavourites().then((posts) => {
        setFavourites(posts);
        const modifiedArr = [];
        let timestamp;
        posts.forEach((data, index) => {
          console.log("data is", data);
          timestamp = data.created_at;
          const date = new Date(timestamp.seconds * 1000);
          const formattedDateTime = date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
          modifiedArr.push({
            id: data.postId,
            user: {
              user: authorUsername,
              userAvatar: user.avatarUrl,
            },
            plant: {
              commonName: data.title,
              scientificName: data.plantName,
              description: data.description,
              imageUrl: data.image,

              timePosted: formattedDateTime,
            },
          });
        });
        setPostData(modifiedArr);
      });
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
            width: "170px",
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
              <FavoriteIcon sx={{ marginRight: 1, color: colors.green1 }} />
              <Typography
                sx={{
                  fontSize: 22,
                  fontFamily: "'Nunito', sans-serif;",
                  fontWeight: 700,
                  color: colors.green1,
                }}
              >
                Favourites
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
      {postData.length > 0 &&
        postData.map((data, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={data.id}>
            <PlantDetails
              id={data.id}
              user={{
                userName: data.user.user,
                userAvatar: data.user.userAvatar,
              }}
              postData={postData}
              setPostData={setPostData}
              index={index}
              plant={data.plant}
              favourites={favouritesArray}
              view={"FAVOURITE"}
            />
          </Grid>
        ))}
    </Grid>
    </Container>

  );
};
export default FavouritesView;
