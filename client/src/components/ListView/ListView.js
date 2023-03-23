import React, { useEffect, useState } from "react";
import PlantDetails from "../PlantDetails/PlantDetails";
import { Grid } from "@mui/material";
import { db, collection, getDocs } from "../../firebase";

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
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postCollectionRef = collection(db, "posts");
      const postSnapshot = await getDocs(postCollectionRef);
      const posts = [];
      postSnapshot.forEach((doc) => {
        const data = doc.data();
        const date = new Date(data.created_at);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        posts.push({
          id: doc.id,
          user: {
            userName: "Brandy",
            userAvatar: "https://source.unsplash.com/random/100x100",
          },
          plant: {
            commonName: data.title,
            scientificName: data.plantName,
            description: data.description,
            imageUrl: data.image,
            timePosted: `${formattedDate} ${formattedTime}`,
          },
        });
      });
      setPostData(posts);
    };    
    fetchData();
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
