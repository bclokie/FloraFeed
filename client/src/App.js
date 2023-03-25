import React, { useState, useEffect } from "react";

import { Container, useMediaQuery, useTheme, Box } from "@mui/material";

import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView/MapView";
import ListView from "./components/ListView/ListView";
import GridView from "./components/GridView/GridView";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useAuth } from "./hooks/useAuth";
import { SubmitForm } from "./components/Submit/SubmitForm";
import { ThemeProvider } from "@mui/material/styles";
import UserProfile from "./components/UserProfile/UserProfile";
import FavouritesView from "./components/FavouritesView/FavouritesView";
import Topbar from "./components/Topbar/Topbar";


const App = () => {
  const { user, handleLogin, handleSignup, handleGoogleSignIn, handleLogout } =
    useAuth();
  const theme = useTheme();

  const [view, setView] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setView("MAP");
  }, []);

  const renderView = () => {
    switch (view) {
      case "FAVOURITES":
        return <FavouritesView />;
      case "MAP":
        return <MapView />;
      case "LIST":
        return <ListView />;
      case "GRID":
        return <GridView />;
      case "SubmitForm":
        return <SubmitForm />;
      case "USER_PROFILE":
        return <UserProfile userId={user.uid} user={user} />;
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
      {isMobile ? (
        <Topbar
          userId={user.uid}
          user={user}
          userAvatar={user.photoURL}
          setView={setView}
          onLogout={onLogout}
        />
      ) : (
        <Sidebar
          userId={user.uid}
          user={user}
          setView={setView}
          onLogout={onLogout}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          marginLeft: isMobile ? 0 : "290px",
          marginTop: isMobile ? "70px" : "0px",
        }}
      >
        {renderView()}
      </Box>
    </Box>
  );
};

export default App;
