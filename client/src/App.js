import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import ListView from "./components/ListView";
import GridView from "./components/GridView";
import Login from "./components/Login/Login";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

const App = () => {
  const [view, setView] = useState("MAP");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setLoggedIn(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {loggedIn ? (
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginBottom: "40px",
              marginLeft: "300px"
            }}
          >
            <div>
              <Button
                variant="outlined"
                color="success"
                style={{ marginRight: "20px" }}
                onClick={() => setView("GRID")}
              >
                Grid
              </Button>
              <Button
                variant="outlined"
                color="success"
                style={{ marginRight: "20px" }}
                onClick={() => setView("LIST")}
              >
                List
              </Button>
              <Button
                variant="outlined"
                color="success"
                style={{ marginRight: "20px" }}
                onClick={() => setView("MAP")}
              >
                Map
              </Button>
            </div>
            <div
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => console.log("submit new post")}
                sx={{ marginLeft: "auto", marginRight: "300px", }}
                startIcon={<AddIcon />}
              >
                New Post
              </Button>
            </div>
          </Container>
          <Sidebar />
          <Container
            sx={{
              width: "60%",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {view === "MAP" ? <MapView /> : ""}
            {view === "LIST" ? <ListView /> : ""}
            {view === "GRID" ? <GridView /> : ""}
          </Container>
          <Button>Test</Button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );  
};

export default App;
