import React, { useState } from "react";
import { useStyles } from "./SubmitStyles.js";
import exifr from "exifr";
import axios from 'axios';

export function SubmitForm() {
  const [title, setTitle] = useState("");
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append('title', title)
    formData.append('Plant Name', plantName)
    formData.append('image', image)
    axios({
      method: 'post',
      url: 'http://localhost:8080/submit',
      data: formData
    })
  }

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    console.log(image);
  }



  return (
    
    <>
    <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      </label>
      <label>
        Plant Name:
        <input type="text" value={plantName} onChange={event => setPlantName(event.target.value)} />
      </label>
      <label>
        File:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Submit</button>
    </form>
    <img src={`data:image/jpeg;base64,${axios.get('http://localhost:8080/')}`}/>
    </>
  );  
}