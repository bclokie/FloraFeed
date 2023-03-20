import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: colors.lightGreen1,
        }}
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
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: colors.white,
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
          }}
          autoComplete="off"
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.green1,
              "&:hover": {
                backgroundColor: colors.green2,
              },
              color: colors.white,
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={() => onLogin(email, password)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
