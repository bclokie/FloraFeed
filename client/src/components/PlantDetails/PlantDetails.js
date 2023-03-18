import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

const PlantDetails = () => {
  const plant = {
    commonName: "Monstera Deliciosa",
    scientificName: "Plant Scientific Name",
    description:
      "Laboris incididunt id ipsum aute duis.Id id adipisicing sint eu ea dolor qui nisi laborum nisi pariatur id excepteur dolor. Id in incididunt amet deserunt ipsum anim. Officia id eiusmod irure amet eiusmod fugiat sit. Incididunt tempor proident quis cillum do deserunt. Adipisicing et eu excepteur magna nisi magna ea. Tempor amet veniam veniam consequat. Ea ea duis do voluptate do ullamco.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1092/9568/products/image_d3fc13d1-5ce4-40d4-bd35-927fbee20c2d_1024x1024.jpg?v=1593528097",
  };

  // Color palette
  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyles = isMobile
    ? {
        h5: {
          fontSize: "1.4rem",
        },
        subtitle1: {
          fontSize: "0.9rem",
        },
        body2: {
          fontSize: "0.8rem",
        },
      }
    : {};

  const imageHeight = isMobile ? "125%" : "125%";

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 345,
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
          <CardMedia
            component="img"
            sx={{
              paddingTop: imageHeight,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              borderBottom: `4px solid ${colors.green2}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${plant.imageUrl})`,
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: colors.green1, ...cardStyles.h5 }}
            >
              {plant.commonName}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontStyle: "italic", ...cardStyles.subtitle1 }}
            >
              {plant.scientificName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={cardStyles.body2}
            >
              {plant.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PlantDetails;
