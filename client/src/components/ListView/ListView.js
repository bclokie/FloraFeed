import React from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import { Grid } from "@mui/material";
import axios from "axios";

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

const postData = [];
const getPosts = function() {
  axios.get('http://localhost:8080/posts')
  .then((posts) => {
    posts.data.map((data, index) => {
      const date = new Date(data.created_at);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      postData.push({
        id: index + 1,
        user: {
          userName: 'Brandy',
          userAvatar: 'https://source.unsplash.com/random/100x100'
        },
        plant: {
          commonName: data.title,
          scientificName: data.plantName,
          description: data.description,
          imageUrl: data.image,
          timePosted: `${formattedDate} ${formattedTime}`
        }
      })
    })
  })
}
getPosts()

const ListView = () => {
  return (
    <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
      {postData.map((data) => (
        <Grid item xs={12} key={data.id}>
          <PlantDetails user={data.user} plant={data.plant} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListView;
