import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useStyles } from './styles'; // Import useStyles from styles.js
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SpaIcon from '@mui/icons-material/Spa';
import UploadIcon from '@mui/icons-material/Upload';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';


const Sidebar = () => {
  const classes = useStyles(); // Use useStyles here

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ display: "flex", flexDirection:"column", alignItems: "center"}}>
        <Avatar sx={{ bgcolor: green[500] }} variant="rounded" xs={8} />
        {['Name', 'Discover', 'My Uploads'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === 'Name' ? <AccountBoxIcon/> : ''}
              {text === 'Discover' ? <SpaIcon/> : ''}
              {text === 'My Uploads' ? <UploadIcon/> : ''}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
  ))}
  </List>
      <List sx={{ position: "absolute", bottom: 0, display: "flex", alignItems: "center" }}>
        <ListItem button>
      <ListItemText primary="Logout" />
    </ListItem>
  </List>
  </Drawer>
  );
};

export default Sidebar;
