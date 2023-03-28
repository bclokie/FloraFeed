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
let authorUsername;
const FavouritesView = () => {
  let [currentUser, setCurrentUser] = useState();
  let [favourites, setFavourites] = useState([]);
  let [postData, setPostData] = useState([]);
  let [favouritesArray, setFavouritesArray] = useState([]);
  const [posterUsername, setPosterUsername] = useState();
  useEffect(() => {
    fetchUser().then((user) => {
      setFavouritesArray(user.favourites);
      setCurrentUser(user);
      fetchUserFavourites().then((posts) => {
        setFavourites(posts);
        const modifiedArr = [];
        let timestamp;
        posts.forEach((data, index) => {
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
            id: index + 1,
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
    <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
      {postData.length > 0 &&
        postData.map((data) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={data.id}>
            <PlantDetails
              user={{
                userName: data.user.user,
                userAvatar: data.user.userAvatar,
              }}
              plant={data.plant}
              favourites={favouritesArray}
              view={"FAVOURITE"}
            />
          </Grid>
        ))}
    </Grid>
  );
};
export default FavouritesView;
