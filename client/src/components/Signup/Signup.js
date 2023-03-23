import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
  glass1: "rgba(255, 255, 255, 0.8)",
  glass2: "rgba(255, 255, 255, 0.15)",
};

const Signup = ({ onSignup, onSwitchToLogin, onGoogleSignIn, onSignupSuccess }) => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await onSignup(userName, email, password);
      onSignupSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="false">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage:
            "url('https://cdn.midjourney.com/5b0f582d-c01b-4253-9ad9-4de668ac04d3/grid_0.png')",
          backgroundSize: "cover",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit} // Updated to use handleSubmit
          sx={{
            backgroundColor: colors.glass1,
            WebkitBackdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
            textAlign: "center",
          }}
          autoComplete="off"
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: colors.green1,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            Sign up
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.green1,
              "&:hover": {
                backgroundColor: colors.green2 },
                color: colors.white,
                textTransform: "none",
                fontWeight: "bold",
              }}
            type="submit"
            >
              Sign up
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <GoogleButton
                label="Continue with Google"
                type="light"
                // onClick={onGoogleSignIn}
              ></GoogleButton>
            </Box>
  
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 1 }}>
                Already have an account?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: colors.green1,
                }}
                onClick={onSwitchToLogin}
              >
                Log in
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default Signup;
  
