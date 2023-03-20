import React, { useState } from "react";
import { useStyles } from "./SubmitStyles.js";

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // Apparently this is how you write 5MB
    if (file && file.size > maxSize) {
      alert("Please choose an image file smaller than 5MB.");
    } else {
      setImage(file);
    }
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={classes.input}
        />
      </label>
      <br />
      <label>
        Scientific Plant Name:
        <input
          type="text"
          value={plantName}
          onChange={(event) => setPlantName(event.target.value)}
          className={classes.input}
        />
      </label>
      <br />
      <label>
        Photo:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={classes.textarea}
        />
      </label>
      <br />
      <button type="submit" className={classes.button}>Submit</button>
    </form>
  );
}
