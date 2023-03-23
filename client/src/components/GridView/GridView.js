import React, {useEffect} from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import Grid from "@mui/material/Grid";
import axios from "axios";

const containerStyle = {
  width: "100%",
  margin: "auto",
  height: "100%",
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

const GridView = () => {

  console.log('posts data is: ', postData)
  return (
    <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
      {postData.map((data) => (
        <Grid item xs={12} sm={12} md={6} lg={4} key={data.id}>
          <PlantDetails user={data.user} plant={data.plant} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridView;
