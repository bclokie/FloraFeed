import React from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
  glass1: "rgba(255, 255, 255, 0.8)",
  glass2: "rgba(255, 255, 255, 0.15)",
};

const Sidebar = ({ userName, userAvatar, onLogout, setView }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        width: 250,
        border: "none",
        boxShadow: 3,
        zIndex: 1100,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderBottom: "1px solid",
          borderColor: colors.green1,
          marginBottom: 2,
        }}
      >
        <Avatar src={userAvatar} sx={{ width: 60, height: 60 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", marginTop: 1, color: colors.green1 }}
        >
          {userName}
        </Typography>
      </Box>
      <List>
        {[
          {
            text: "Favourites",
            onClick: () => setView("FAVOURITES"),
            icon: <FavoriteIcon />,
          },
          {
            text: "Grid View",
            onClick: () => setView("GRID"),
            icon: <GridViewIcon />,
          },
          {
            text: "List View",
            onClick: () => setView("LIST"),
            icon: <ListIcon />,
          },
          {
            text: "Map View",
            onClick: () => setView("MAP"),
            icon: <MapIcon />,
          },
          {
            text: "User Profile",
            onClick: () => setView("USER_PROFILE"),
            icon: <AccountCircleIcon />,
          },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={item.onClick}
            sx={{
              "&:hover": {
                backgroundColor: colors.green1,
                color: colors.lightGreen1,
              },
              color: colors.green1,
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Box sx={{ padding: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setView("SubmitForm")}
            sx={{
              marginBottom: 2,
              borderColor: colors.green1,
              color: colors.green1,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            New Post
          </Button>
        </Box>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: 2 }}>
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
          }}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
