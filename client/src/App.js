import React from "react";
import Sidebar from "./components/Sidebar/Sidebar"
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from 'react';
import ListView from "./components/ListView";
import GridView from "./components/GridView";
const App = () => {
  const [view, setView] = useState('MAP')

  return (
    <div >
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px'}}>
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }} onClick={() => setView('GRID')}>Grid</Button>
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }} onClick={() => setView('LIST')}>List</Button> 
        <Button variant="outlined" color="success" style={{ marginRight: '20px' }} onClick={() => setView('MAP')}>Map</Button>
      </Container>
      <Sidebar />
      <Container sx={{width: '60%', height: '400px', display:'flex', alignItems:'center', justifyContent: 'center'}}>
        {view === 'MAP' ? <MapView/> : ''}
        {view === 'LIST' ? <ListView/> : ''}
        {view === 'GRID' ? <GridView/> : ''}
      </Container>
      <Button>Test</Button>
    </div>
  );
};

export default App;
