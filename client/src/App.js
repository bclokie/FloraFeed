import React, { useState, useEffect } from "react";

import { Container, useMediaQuery, useTheme, Box, } from "@mui/material";

import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView/MapView";
import ListView from "./components/ListView/ListView";
import GridView from "./components/GridView/GridView";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useAuth } from "./hooks/useAuth";
import { SubmitForm } from "./components/Submit/SubmitForm";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/Submit/SubmitStyles";

const App = () => {
  const { user, handleLogin, handleSignup, handleGoogleSignIn, handleLogout } =
    useAuth();
  const theme = useTheme();

  const [view, setView] = useState("MAP");

  useEffect(() => {
    setView("MAP")
  })

  const renderView = () => {
    switch (view) {
      case "MAP":
        return <MapView />;
      case "LIST":
        return <ListView />;
      case "GRID":
        return <GridView />;
      case "SubmitForm":
        return <SubmitForm />;
      default:
        return null;
    }
  };

  const onLogout = () => {
    handleLogout()
      .then(() => setView("LOGIN"))
      .catch((error) => console.log(error));
  };

  if (!user) {
    return (
      <>
        {view !== "SIGNUP" ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setView("SIGNUP")}
            onGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          ""
        )}
        {view === "SIGNUP" ? (
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setView("LOGIN")}
            onGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        component="aside"
        sx={{
          width: "240px",
          backgroundColor: "background.paper",
          position: "fixed",
        }}
      >
        <Sidebar
          setView={setView}
          userName={user.displayName}
          userAvatar={user.photoURL}
          onLogout={onLogout}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          backgroundColor: "background.default",
          marginLeft: "240px",
        }}
      >
        {renderView()}
      </Box>
    </Box>
  );
};

const WrappedApp = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default WrappedApp;
