import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useStyles } from './styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SpaIcon from '@mui/icons-material/Spa';
import UploadIcon from '@mui/icons-material/Upload';
import { Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ open, handleSidebarClose, text }) => {
  const classes = useStyles();
  const { handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
  };

  const handleListItemClick = (menuItem) => {
    console.log(`Clicked ${menuItem}`);
    // TODO: Handle the click event for each list item
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleSidebarClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}>
      </div>
      <List>
        <Typography variant="h4" textAlign="center" color="green" className={classes.logo}>
          Logo
        </Typography>
        {['Name', 'Discover', 'My Uploads'].map((menuItem, index) => (
          <ListItem button key={menuItem} onClick={() => handleListItemClick(menuItem)}>
            <ListItemIcon>
              {menuItem === 'Name' && <AccountBoxIcon />}
              {menuItem === 'Discover' && <SpaIcon />}
              {menuItem === 'My Uploads' && <UploadIcon />}
            </ListItemIcon>
            <ListItemText primary={menuItem} />
          </ListItem>
        ))}
      </List>
      <List className={classes.logoutButton} sx={{ position: "absolute", bottom: 0, width: "100%", textAlign: "center", borderTopLeftRadius: 16, borderTopRightRadius: 16, bgcolor: "#f5f5f5", p: 2 }}>
        <ListItem button onClick={() => handleLogoutClick()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
