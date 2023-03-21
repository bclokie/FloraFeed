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

const Sidebar = ({ open, handleSidebarClose }) => {
  const classes = useStyles();
  const { handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
  };

  const handleListItemClick = (text) => {
    console.log(`Clicked ${text}`);
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
        {['Name', 'Discover', 'My Uploads'].map((text, index) => (
          <ListItem button key={text} onClick={() => handleListItemClick(text)}>
            <ListItemIcon>
              {text === 'Name' && <AccountBoxIcon />}
              {text === 'Discover' && <SpaIcon />}
              {text === 'My Uploads' && <UploadIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List className={classes.logoutButton} sx={{ position: "absolute", bottom: 0 }}>
        <ListItem button onClick={handleLogoutClick}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
