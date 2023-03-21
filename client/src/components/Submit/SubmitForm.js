import React, { useState } from "react";
import { useStyles } from "./SubmitStyles.js";
import exifr from "exifr";

export function SubmitForm() {
  const [title, setTitle] = useState("");
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setPlantName("");
    setImage(null);
    setDescription("");
  };

  const colors = {
    white: "#FFFFFF",
    green1: "#2C7C50",
    green2: "#2B764A",
    lightGreen1: "#EDF1F0",
    lightGreen2: "#DAE1D8",
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // This = 5MB
    if (file && file.size > maxSize) {
      alert("Please choose an image file smaller than 5MB.");
    } else {
      // Read GPS data from the image file
      let exifData = await exifr.gps(file);
      /* The following is placeholder until we can 
      ask user to add pins to Google Maps */
      if (!exifData || !exifData.latitude || !exifData.longitude) {
        alert("Please choose an image file with GPS data")
      } else {
        setImage(file)      
      }
    }
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
    <label>
      <span style={{ 
        color: colors.green1,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: "bold",
        fontSize: "24px",
        marginTop: "200px",
        marginBottom: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>Title:
      </span>        
      <input style= {{ marginBottom: "40px"}}
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
      }}> Scientific Plant Name:
      </span> 
        <input style= {{ marginBottom: "40px"}}
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
      }}>
        Photo:
        </span>
        <input style= {{ marginBottom: "20px"}}
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
      }}>
        Description:
      </span>
        <textarea style= {{ marginBottom: "40px"}}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={classes.textarea}
        />
      </label>
      <br />
      <button type="submit" className={classes.button} >Submit</button>
    </form>
  );
}