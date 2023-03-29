import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { handleFavourite } from "../../dataFetcher";
import { useSlotProps } from "@mui/base";

const PlantDetails = ({
  user,
  plant,
  favourites,
  id,
  view,
  setPostData,
  postData,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentFavourites, setCurrentFavourites] = useState(favourites);
  const [isFavourite, setIsFavourite] = useState(favourites.includes(id));
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Color palette
  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("favourites is in plantdetails", favourites);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          maxWidth: 520,
          borderRadius: 2,

          mx: "auto",
          my: 1,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            bgcolor: `${colors.white}}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              paddingBottom: 0.5,
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
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bold",
                }}
              >
                {view !== "FAVOURITE" ? user.userName : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="add to favorites"
                sx={{ color: colors.green1 }}
                onClick={() => {
                  setIsFavourite(!isFavourite);
                  handleFavourite(id, favourites).then(() => {
                    if (!isFavourite) {
                      const newPostsData = [...postData];
                      newPostsData.splice(index, 1);
                      setPostData(newPostsData);
                    }
                  });
                }}
              >
                {isFavourite || view === "FAVOURITE" ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              paddingTop: "100%",
              cursor: "pointer",
            }}
            onClick={handleOpenModal}
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
                borderBottom: `3px solid ${colors.green2}`,
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
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: colors.green1,
                fontFamily: "'Montserrat', sans-serif",
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
              sx={{
                mb: 1,
                fontFamily: "'Nunito', sans-serif",
                overflow: "hidden",
                textOverflow: expanded ? "unset" : "ellipsis",
                whiteSpace: expanded ? "normal" : "nowrap",
                width: "100%",
                lineHeight: 1.5,
                minHeight: expanded ? "unset" : "1rem",
              }}
            >
              {plant.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: "left" }}
              >
                {plant.timePosted}
              </Typography>
              <Button
                size="small"
                onClick={handleExpandClick}
                sx={{ textTransform: "none", color: colors.green1 }}
              >
                {expanded ? "Less" : "More"}
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="plant-image-modal"
        aria-describedby="plant-image-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon sx={{ fontSize: 40, color: colors.white }} />
            </IconButton>
          </Box>
          <img
            src={plant.imageUrl}
            alt={plant.commonName}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default PlantDetails;
