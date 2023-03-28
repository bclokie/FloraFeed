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
import UserProfile from "./components/UserProfile/UserProfile";
import FavouritesView from "./components/FavouritesView/FavouritesView";
import Topbar from "./components/Topbar/Topbar";
import SplashScreen from "./components/Splash/Splash";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const { user, handleLogin, handleSignup, handleGoogleSignIn, handleLogout } =
    useAuth();
  const theme = useTheme();
  const [view, setView] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setView("USER_PROFILE");
  }, []);

  useEffect(() => {
    console.log("App component re-rendered");
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
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

  const fadeIn = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
      {!showSplash && (
        <>
          {!user ? (
            view === "SIGNUP" ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="signup"
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                  exit="exit"
                >
                  <Signup
                    onSignup={(email, password) =>
                      handleSignup(email, password)
                        .then(() => setView("USER_PROFILE"))
                        .catch((error) => console.log(error))
                    }
                    onSwitchToLogin={() => setView("LOGIN")}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                <motion.div
                  key="login"
                  initial="initial"
                  animate="animate"
                  variants={fadeIn}
                  exit="exit"
                >
                  <Login
                    key="login"
                    onLogin={(email, password) =>
                      handleLogin(email, password)
                        .then(() => setView("USER_PROFILE"))
                        .catch((error) => console.log(error))
                    }
                    onSwitchToSignup={() => setView("SIGNUP")}
                    onGoogleSignIn={() =>
                      handleGoogleSignIn()
                        .then(() => setView("GRID"))
                        .catch((error) => console.log(error))
                    }
                  />
                </motion.div>
              </AnimatePresence>
            )
          ) : (
            <Container
              maxWidth
              disableGutters
              sx={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                minHeight: "98vh",
                display: "flex",
                backgroundImage: `
      linear-gradient(to top, rgba(255, 255, 255, 0) 1%, rgba(255, 255, 255, 0.8) 90%),
      url('../../assets/bgplants.png')
    `,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                padding: 0,
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
                  marginLeft: isMobile ? 0 : "300px",
                  marginTop: isMobile ? "70px" : "0px",
                }}
              >
                {renderView()}
              </Box>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default App;
