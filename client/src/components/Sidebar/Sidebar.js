import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchUserData } from "../../dataFetcher";
import Modal from "@mui/material/Modal";
import { SubmitForm } from "../Submit/SubmitForm";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#96BCA7",
  lightGreen2: "#DAE1D8",
};

const Sidebar = ({ userId, onLogout, setView }) => {
  const [user, setUser] = useState(null);
  const [submitFormOpen, setSubmitFormOpen] = useState(false);

  const handleCloseSubmitForm = () => {
    setSubmitFormOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUserData();
      const currentUser = users.find((user) => user.userId === userId);

      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("No such user!");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box
      sx={{
        backgroundColor: `${colors.white}`,
        width: "290px",
        boxShadow: 3,
        height: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
            borderBottomColor: colors.green1,
            mt: 2,
            cursor: "pointer",
          }}
          onClick={() => setView("USER_PROFILE")}
        >
          <Avatar
            src={user.userAvatar}
            sx={{ width: "12vmin", height: "12vmin" }}
          />
          <Typography
            variant="h5"
            sx={{
              marginTop: 1,
              color: colors.green1,
              fontSize: "3vmin",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
            }}
          >
            {user.userFirstName} {user.userLastName}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            color="text.secondary"
            sx={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "1.4vmin",
            }}
          >
            @{user.userName}
          </Typography>
          <Box
            sx={{
              height: "2px",
              width: "70%",
              backgroundColor: colors.green1,
              mt: 1,
            }}
          />
        </Box>
      )}
      <Box sx={{ padding: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddAPhotoIcon />}
          onClick={() => setSubmitFormOpen(true)}
          sx={{
            backgroundColor: colors.green1,
            color: colors.white,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: colors.green2,
            },
            fontSize: "1.7vmin",
          }}
        >
          New Post
        </Button>
      </Box>

      <List sx={{ marginTop: 8, mr: 0, wdith: "18vw" }}>
        {[
          {
            text: "Favorites",
            onClick: () => setView("FAVOURITES"),
            icon: <FavoriteIcon sx={{ pl: 2, fontSize: "3vmin" }} />,
            icon2: (
              <KeyboardArrowRightIcon sx={{ pl: "2vw", fontSize: "3vmin" }} />
            ),
          },
          {
            text: "Grid View",
            onClick: () => setView("GRID"),
            icon: <GridViewIcon sx={{ pl: 2, fontSize: "3vmin" }} />,
            icon2: (
              <KeyboardArrowRightIcon sx={{ pl: "2vw", fontSize: "3vmin" }} />
            ),
          },
          {
            text: "List View",
            onClick: () => setView("LIST"),
            icon: <ListIcon sx={{ pl: 2, fontSize: "3vmin" }} />,
            icon2: (
              <KeyboardArrowRightIcon sx={{ pl: "2vw", fontSize: "3vmin" }} />
            ),
          },
          {
            text: "Map View",
            onClick: () => setView("MAP"),
            icon: <MapIcon sx={{ pl: 2, fontSize: "3vmin" }} />,
            icon2: (
              <KeyboardArrowRightIcon sx={{ pl: "2vw", fontSize: "3vmin" }} />
            ),
          },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={item.onClick}
            sx={{
              "&:hover": {
                backgroundColor: colors.lightGreen2,
                color: colors.green1,
              },
              color: colors.green1,
              borderRadius: 2,
              marginBottom: 1,
              padding: "10px 9px",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", marginRight: 2 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                sx: {
                  pl: 3,
                  fontSize: "2vmin",
                  fontFamily: "'Nunito', sans-serif;",
                  fontWeight: 500,
                },
              }}
            />
            <ListItemIcon sx={{ color: "inherit", marginRight: 2 }}>
              {item.icon2}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ padding: 8, pb: 3 }}>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            backgroundColor: colors.green1,
            color: colors.white,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: colors.green2,
            },
            fontSize: "1.6vmin",
          }}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
      <Modal
        open={submitFormOpen}
        onClose={handleCloseSubmitForm}
        aria-labelledby="submit-form-modal"
        aria-describedby="modal-for-submitting-a-new-post"
      >
        <SubmitForm handleClose={handleCloseSubmitForm} />
      </Modal>
      <Box
        sx={{
          pb: 0,
          pl: 5,
          pt: 1,
          borderTop: `2px solid ${colors.green1}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <img
            src="https://cdn.discordapp.com/attachments/1085966387203293376/1089398046019813386/Alex_Ferru_simple_green_leaf_map_marker_logo_vector_art_adobe_i_b87b5e1b-1d02-4b11-8f88-820e10527f42-IMAGEX_26265c48.png"
            alt="FloraFeed logo"
            width="60px"
            height="60px"
            sx={{ mr: 0 }}
          />
          <Typography
            variant="body1"
            sx={{
              color: colors.green1,
              fontSize: "2.7vmin",
            }}
          >
            <span style={{ fontFamily: "Nunito", fontWeight: "bold" }}>
              Flora
            </span>
            <span style={{ fontFamily: "Nunito", fontWeight: "regular" }}>
              Feed
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
