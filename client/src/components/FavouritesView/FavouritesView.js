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

// let currentUser;
// let favourites = [];
// fetchUser().then((user) => {
//   console.log("user", user);
// });

// fetchUserFavourites().then((favs) => {
//   favourites.push(...favs);
// });

const FavouritesView = () => {
  let [user, setUser] = useState();
  let [favourites, setFavourites] = useState();
  let [postData, setPostData] = useState();
  useEffect(() => {
    fetchUser().then((user) => {
      setUser(user);
    });
    fetchUserFavourites().then((posts) => {
      setFavourites([...posts]);
    });
    createPosts(favourites, user);
  }, []);

  return <div>Hello</div>;
};

export default FavouritesView;
