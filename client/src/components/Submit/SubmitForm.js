import React, { useState } from "react";
import { Form } from "./SubmitStyles.js";
import exifr from "exifr";
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export function SubmitForm() {
  const [title, setTitle] = useState("");
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [exifData, setExifData] = useState(null); // Declare exifData state here

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setPlantName("");
    setImage(null);
    setDescription("");
    submitData()
  };

  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
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
        alert("Please choose an image file with GPS data")
      } else {
        setImage(file); // Set the image file as the state
        setExifData(data); // Update the value of exifData state
        console.log("Done!")
      }
    }
  };

  const submitData = async function() {
    const storageRef = ref(storage, "images/" + image.name);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    axios({
      method: 'post',
      url: 'http://localhost:8080/submit',
      data: {
        title,
        plantName, 
        image: downloadURL,
        description,
        latitude: exifData ? exifData.latitude : null, // include latitude field
        longitude: exifData ? exifData.longitude : null // include longitude field
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const classes = Form();

  const disabledButtonStyles = {
    backgroundColor: "gray",
    color: "white",
    cursor: "not-allowed"
  };
  
  const enabledButtonStyles = {
    backgroundColor: colors.green1,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: colors.green2,
    },
  };

  const buttonStyles = !title || !plantName || !image || !description
    ? disabledButtonStyles : enabledButtonStyles;


  return (
    <form onSubmit={handleSubmit} style={{ width: "90%" }}>
      <label>
        <span style={{
          color: colors.green1,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "100px",
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: "25%",
          margin: "0 auto",
        }}>Title:
        </span>
        <input style={{
          marginBottom: "40px",
          width: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={classes.input}
        />
      </label>
      <br />
      <label>
        <span style={{
          color: colors.green1,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: "25%",
          margin: "0 auto",
        }}> Scientific Plant Name:
        </span>
        <input style={{
          marginBottom: "40px",
          width: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
          type="text"
          value={plantName}
          onChange={(event) => setPlantName(event.target.value)}
          className={classes.input}
        />
      </label>
      <br />
      <label>
        <span style={{
          color: colors.green1,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: "25%",
          margin: "0 auto",
        }}>
          Photo:
          </span>
        <input style={{
          marginTop: "10px",
          marginBottom: "20px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      <br />
      <br></br>
      <label>
        <span style={{
          color: colors.green1,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: "25%",
          margin: "0 auto",
        }}>
          Description:
        </span>
        <textarea
          style={{
            marginBottom: "40px",
            maxWidth: "70%",
            margin: "0 auto",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={classes.textarea}
        />
      </label>
      <br />
      <button
        type="submit"
        className={classes.button}
        onSubmit={submitData}
        style={buttonStyles}
        disabled={!title || !plantName || !image || !description}
      >
        Submit
      </button>
    </form>
  );  
}