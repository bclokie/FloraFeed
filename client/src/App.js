import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import ListView from "./components/ListView";
import GridView from "./components/GridView";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"; // Import the Signup component
import axios from "axios";

const App = () => {
  const [view, setView] = useState("MAP");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // Add state to toggle between Login and Signup

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

  const handleSignup = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        alert("User registered successfully");
        setShowSignup(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!loggedIn) {
    return (
      <>
        {showSignup ? (
          <Signup onSignup={handleSignup} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <Button
          onClick={() => setShowSignup(!showSignup)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {showSignup ? "Back to Login" : "Sign up"}
        </Button>
      </>
    );
  }

  return (
    <div>
      {loggedIn ? (
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
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
