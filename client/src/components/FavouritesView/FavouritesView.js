import React, { useEffect, useState } from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import Grid from "@mui/material/Grid";
import {
  fetchUserData,
  fetchPostsData,
  fetchUserFavourites,
  fetchUser,
  createPosts,
} from "../../dataFetcher";
const FavouritesView = () => {
  let [currentUser, setCurrentUser] = useState();
  let [favourites, setFavourites] = useState([]);
  let [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchUser().then((user) => {
      setCurrentUser(user);
      fetchUserFavourites().then((posts) => {
        setFavourites(posts);
        const modifiedArr = [];
        posts.forEach((data, index) => {
          modifiedArr.push({
            id: index + 1,
            user: {
              user: user.userName,
              userAvatar: user.avatarUrl,
            },
            plant: {
              commonName: data.title,
              scientificName: data.plantName,
              description: data.description,
              imageUrl: data.image,
              timePosted: "test",
            },
          });
        });
        setPostData(modifiedArr);
      });
    });
  }, []);

  return (
    <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
      {postData.length > 0 &&
        postData.map((data) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={data.id}>
            <PlantDetails user={data.user} plant={data.plant} />
          </Grid>
        ))}
    </Grid>
  );
};
export default FavouritesView;
