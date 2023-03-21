import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useStyles } from './styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SpaIcon from '@mui/icons-material/Spa';
import UploadIcon from '@mui/icons-material/Upload';
import { Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const classes = useStyles();
  const { handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" textAlign="center" color="green">
          Logo
        </Typography>
        {['Name', 'Discover', 'My Uploads'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === 'Name' ? <AccountBoxIcon /> : ''}
              {text === 'Discover' ? <SpaIcon /> : ''}
              {text === 'My Uploads' ? <UploadIcon /> : ''}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <ListItem button variant="outlined" sx={{ textAlign: "center" }} onClick={handleLogoutClick}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
