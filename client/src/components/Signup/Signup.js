import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import GoogleButton from "react-google-button";
import { useAuth } from "../../hooks/useAuth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Signup = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { handleSignup, handleGoogleSignIn } = useAuth();
  const [avatarFile, setAvatarFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
    glass1: "rgba(255, 255, 255, 0.8)",
    glass2: "rgba(255, 255, 255, 0.15)",
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
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: colors.green1,
                "&:hover": {
                  backgroundColor: colors.green2,
                },
                marginTop: 2,
                textTransform: "none",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {fileName || "Upload Profile Picture"}
              <input
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setAvatarFile(e.target.files[0]);
                  setFileName(e.target.files[0]?.name); // Update fileName when a file is selected
                }}
                style={{
                  display: "none",
                }}
              />
            </Button>
          </FormControl>

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
            onClick={() =>
              handleSignup(
                firstName,
                lastName,
                userName,
                email,
                password,
                avatarFile
              )
            }
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
              onClick={handleGoogleSignIn}
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
