import React, { useEffect, useState } from "react";
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

const ListView = () => {
  let [postData, setPostData] = useState([]);
  useEffect(() => {
    const temp = [];
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/final-project-lhl-a053a/databases/(default)/documents/posts"
      )
      .then((posts) => {
        posts.data.documents.map((data, index) => {
          const date = new Date(data.createTime);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();
          temp.push({
            id: index + 1,
            user: {
              userName: "Brandy",
              userAvatar: "https://source.unsplash.com/random/100x100",
            },
            plant: {
              commonName: data.fields.title.stringValue,
              scientificName: data.fields.plantName.stringValue,
              description: data.fields.description.stringValue,
              imageUrl: data.fields.image.stringValue,
              timePosted: `${formattedDate} ${formattedTime}`,
            },
          });
        });
        setPostData(temp);
      });
  }, []);
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
