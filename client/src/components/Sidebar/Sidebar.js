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
import { fetchUserData } from "../../dataFetcher";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
  glass1: "rgba(255, 255, 255, 0.8)",
  glass2: "rgba(255, 255, 255, 0.15)",
};

const Sidebar = ({ userId, onLogout, setView }) => {
  const [user, setUser] = useState(null);

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
        backgroundColor: "#FFFFFF",
        width: 300,
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
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderBottom: "3px solid",
            borderColor: colors.green1,
            marginBottom: 2,
            cursor: "pointer",
          }}
          onClick={() => setView("USER_PROFILE")}
        >
          <Avatar src={user.userAvatar} sx={{ width: 90, height: 90 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginTop: 1, color: colors.green1 }}
          >
            {user.userFirstName} {user.userLastName}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            color="text.secondary"
            sx={{
              fontFamily: "Playfair Display', serif",
            }}
          >
            @{user.userName}
          </Typography>
        </Box>
      )}
      <List>
        {[
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
