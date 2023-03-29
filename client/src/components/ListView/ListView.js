import React, { useEffect, useState } from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import { Grid } from "@mui/material";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";

const containerStyle = {
  width: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
};

const center = {
  lat: 0,
  lng: 0,
};

const ListView = () => {
  let [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserData();
      const usersWithPosts = await fetchPostsData(users);
      setUsersData(usersWithPosts);
    };

    fetchData();
  }, []);
  return (
    <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
      {usersData.length > 0 &&
        usersData.map((user) =>
          user.posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <PlantDetails
                user={{
                  userName: user.userName,
                  userAvatar: user.userAvatar,
                }}
                plant={post.plant}
              />
            </Grid>
          ))
        )}
    </Grid>
  );
};

export default ListView;
