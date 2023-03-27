import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette,
}));

const Logo = styled(motion.img)({
  width: "150px",
  marginRight: "0.5rem",
});

const bounce = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, bounce: 0.3, ease: "easeOut" },
  },
  exit: { y: -100, opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const SplashScreen = () => {
  return (
    <Container
      maxWidth
      sx={{
        backgroundImage:
          "url('https://cdn.midjourney.com/e0da86a9-00c5-4689-ac45-05a805a59d2a/grid_0.png')",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Logo
        src="https://cdn.discordapp.com/attachments/1085966387203293376/1089398046019813386/Alex_Ferru_simple_green_leaf_map_marker_logo_vector_art_adobe_i_b87b5e1b-1d02-4b11-8f88-820e10527f42-IMAGEX_26265c48.png"
        alt="FloraFeed logo"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={bounce}
      />
      <Typography
        component={motion.h1}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        sx={{ fontSize: 50, color: `${colors.green1}`, pr: 15 }}
      >
        <span style={{ fontFamily: "Nunito", fontWeight: "bold" }}>Flora</span>
        <span style={{ fontFamily: "Nunito", fontWeight: "regular" }}>
          Feed
        </span>
      </Typography>
    </Container>
  );
};

export default SplashScreen;
