import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import ListView from "./components/ListView";
import GridView from "./components/GridView";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import firebase from "./firebase";

const App = () => {
  const [view, setView] = useState("MAP");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (firstName, lastName, email, password) => {
    try {
      await firebase.auth.createUserWithEmailAndPassword(email, password);

      alert("User registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Button
          onClick={() => setView("SIGNUP")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          Sign up
        </Button>
        {view === "SIGNUP" ? <Signup onSignup={handleSignup} /> : ""}
      </>
    );
  }

  return (
    <div>
      {user ? (
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
