import React from 'react';
import PlantDetails from '../PlantDetails/PlantDetails';
import { Grid } from '@mui/material';
const containerStyle = {
  width: '100%',
  height: '60vh',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column'
};

const center = {
  lat: 0,
  lng: 0,
};

const mockData = [
  {
    id: 1,
    user: {
      userName: "Brandy",
      userAvatar: "https://source.unsplash.com/random/100x100",
    },
    plant: {
      commonName: "Monstera Deliciosa",
      scientificName: "Plant Scientific Name",
      description: "Laboris ",
      imageUrl: "https://source.unsplash.com/random/1080x1080",
      timePosted: "2 hours ago",
    },
  },
  {
    id: 2,
    user: {
      userName: "John",
      userAvatar: "https://source.unsplash.com/random/100x100?sig=1",
    },
    plant: {
      commonName: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      description:
        "Ut et incididunt exercitation ullamco enim eiusmod reprehenderit ex exercitation duis.",
      imageUrl: "https://source.unsplash.com/random/1080x1080?sig=2",
      timePosted: "4 hours ago",
    },
  },
  {
    id: 3,
    user: {
      userName: "Brandy",
      userAvatar: "https://source.unsplash.com/random/100x100?sig=3",
    },
    plant: {
      commonName: "Monstera Deliciosa",
      scientificName: "Plant Scientific Name",
      description:
        "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor.",
      imageUrl: "https://source.unsplash.com/random/1080x1080?sig=4",
      timePosted: "2 hours ago",
    },
  },
  {
    id: 4,
    user: {
      userName: "Brandy",
      userAvatar: "https://source.unsplash.com/random/100x100?sig=5",
    },
    plant: {
      commonName: "Monstera Deliciosa",
      scientificName: "Plant Scientific Name",
      description:
        "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor.",
      imageUrl: "https://source.unsplash.com/random/1080x1080?sig=6",
      timePosted: "2 hours ago",
    },
  },
  {
    id: 5,
    user: {
      userName: "Brandy",
      userAvatar: "https://source.unsplash.com/random/100x100",
    },
    plant: {
      commonName: "Monstera Deliciosa",
      scientificName: "Plant Scientific Name",
      description:
        "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor.",
      imageUrl: "https://source.unsplash.com/random/1080x1080",
      timePosted: "2 hours ago",
    },
  },
];




function ListView() {
  return (
    <div style={containerStyle}>
      <Grid>
        {mockData.map((data) => (
          <Grid key={data.id}>
            <PlantDetails user={data.user} plant={data.plant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListView;
