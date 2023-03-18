import React from "react";
import Sidebar from "./components/Sidebar/Sidebar"
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import {Typography} from "@mui/material";
const App = () => {
  return (
    <div >
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px'}}>
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }}>Grid</Button>
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }}>List</Button> 
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }}>Map</Button>
      </Container>
      <Sidebar />
      <Container sx={{width: '60%', height: '400px', display:'flex', alignItems:'center', justifyContent: 'center'}}>
        <MapView/>
      </Container>
      <Button>Test</Button>
    </div>
  );
};

export default App;
