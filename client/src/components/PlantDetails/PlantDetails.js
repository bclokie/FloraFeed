import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";

const PlantDetails = () => {
  // Test Data
  const user = {
    userName: "Brandy",
    userAvatar: "https://source.unsplash.com/random/100x100",
  };

  const plant = {
    commonName: "Monstera Deliciosa",
    scientificName: "Plant Scientific Name",
    description:
      "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor.",
    imageUrl: "https://source.unsplash.com/random/1080x1080",
    timePosted: "2 hours ago",
  };

  // Color palette
  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 400,
          bgcolor: colors.lightGreen1,
          borderRadius: 2,
          boxShadow: 3,
          mx: "auto",
          my: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            bgcolor: colors.white,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="User Avatar"
                src={user.userAvatar}
                sx={{ width: 32, height: 32, marginRight: 1 }}
              />
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  color: colors.green1,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: "bold",
                }}
              >
                {user.userName}
              </Typography>
            </Box>

            <IconButton
              aria-label="add to favorites"
              sx={{ color: colors.green1 }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "relative",
              paddingTop: "100%",
            }}
          >
            <CardMedia
              component="img"
              alt="Plant image"
              image={plant.imageUrl}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                borderBottom: `4px solid ${colors.green2}`,
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              height: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: colors.green1,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: "bold",
              }}
            >
              {plant.commonName}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                fontFamily: "Playfair Display', serif",
              }}
            >
              {plant.scientificName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, fontFamily: "'Nunito', sans-serif" }}
            >
              {plant.description}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: "left" }}
            >
              {plant.timePosted}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default PlantDetails;