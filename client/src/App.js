import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import PlantDetails from "./components/PlantDetails/PlantDetails";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <PlantDetails />
    </Box>
  );
};

export default App;
