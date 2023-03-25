import React, { useState, useEffect } from "react";
import exifr from "exifr";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export function SubmitForm({ handleClose }) {
  const [title, setTitle] = useState("");
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [exifData, setExifData] = useState(null); // Declare exifData state here
  const [uid, setUid] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitData(); // Call submitData() first
    setTitle("");
    setPlantName("");
    setImage(null);
    setDescription("");
    if (handleClose) {
      handleClose(); // Call handleClose after submitting data
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("uid: ", uid);
  }, [uid]);

  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
    glass1: "rgba(255, 255, 255, 0.8)",
    glass2: "rgba(255, 255, 255, 0.15)",
  };

  const handleImageChange = async (event) => {
    console.log("handleImageChange called");
    const file = event.target.files[0];
    const maxSize = 10 * 1024 * 1024; // This = 10MB
    if (file && file.size > maxSize) {
      alert("Please choose an image file smaller than 10MB.");
      return;
    } else {
      // Read GPS data from the image file
      let data = await exifr.gps(file); // Update the value of exifData state
      console.log(data.latitude);
      console.log(data.longitude);
      /* The following is placeholder until we can 
      ask user to add pins to Google Maps */
      if (!data || !data.latitude || !data.longitude) {
        alert("Please choose an image file with GPS data");
      } else {
        setImage(file); // Set the image file as the state
        setExifData(data); // Update the value of exifData state
        console.log("Done!");
      }
    }
  };

  const submitData = async function () {
    const storageRef = ref(storage, "images/" + image.name);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        plantName,
        image: downloadURL,
        description,
        latitude: exifData ? exifData.latitude : null, // include latitude field
        longitude: exifData ? exifData.longitude : null, // include longitude field
        uid, // included uid field
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const disabledButtonStyles = {
    backgroundColor: "gray",
    color: "white",
    cursor: "not-allowed",
  };

  const enabledButtonStyles = {
    backgroundColor: colors.green1,
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: colors.green2,
    },
  };

  const buttonStyles =
    !title || !plantName || !image || !description
      ? disabledButtonStyles
      : enabledButtonStyles;

  return (
    <Container maxWidth="false">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: "url('')",
          backgroundSize: "cover",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
            textAlign: "center",
          }}
          autoComplete="off"
        >
          <Box sx={{ position: "absolute", top: 82, right: 568, zIndex: 1 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ fontSize: 40, color: colors.white }} />
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: colors.green1,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Submit a New Plant
          </Typography>
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
              }}
            >
              Choose File
              <input
                id="photo-file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  display: "none",
                }}
              />
            </Button>
            {image && (
              <FormHelperText style={{ textAlign: "center", marginTop: 1 }}>
                {image.name}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Scientific Plant Name"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={plantName}
            onChange={(event) => setPlantName(event.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ marginBottom: 2, backgroundColor: colors.glass2 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={4}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              fontFamily: "'Nunito', sans-serif",
              backgroundColor: colors.green1,
              "&:hover": {
                backgroundColor: colors.green2,
              },
              color: colors.white,
              textTransform: "none",
              fontWeight: "bold",
              marginTop: 2,
            }}
            type="submit"
            disabled={!title || !plantName || !image || !description}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
