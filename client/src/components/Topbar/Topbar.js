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
import Modal from "@mui/material/Modal";
import { SubmitForm } from "../Submit/SubmitForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const colors = {
  white: "#E3DDD1",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#96BCA7",
  lightGreen2: "#DAE1D8",
};

const Topbar = ({ userId, onLogout, setView }) => {
  const [user, setUser] = useState(null);
  const [submitFormOpen, setSubmitFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (view) => {
    setAnchorEl(null);
    if (view) {
      setView(view);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: 1100, backgroundColor: colors.white, color: colors.green1 }}
    >
      <Toolbar>
        {user && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="user profile"
            onClick={() => setView("USER_PROFILE")}
          >
            {user.userAvatar ? (
              <Avatar
                src={user.userAvatar}
                sx={{ width: 40, height: 40 }}
                alt="User Avatar"
              />
            ) : (
              <AccountCircleIcon />
            )}
            <Typography
              variant="subtitle1"
              sx={{ ml: 1, fontWeight: "bold", color: colors.green1 }}
            >
              @{user.userName}
            </Typography>
          </IconButton>
        )}
        <IconButton color="inherit" onClick={() => setSubmitFormOpen(true)}>
          <AddIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={handleClickMenu}
        >
          <ListIcon />
        </IconButton>
        <Menu
          id="view-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleCloseMenu()}
        >
          <MenuItem onClick={() => handleCloseMenu("GRID")}>Grid View</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("LIST")}>List View</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("MAP")}>Map View</MenuItem>
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
      <Modal
        open={submitFormOpen}
        onClose={handleCloseSubmitForm}
        aria-labelledby="submit-form-modal"
        aria-describedby="modal-for-submitting-a-new-post"
      >
        <SubmitForm handleClose={handleCloseSubmitForm} />
      </Modal>
    </AppBar>
  );
};

export default Topbar;
