import React, { useState } from "react";

function SubmitForm() {
  const [title, setTitle] = useState("");
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to server using axios or fetch
    // Reset form fields
    setTitle("");
    setPlantName("");
    setImage(null);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        Scientific Plant Name:
        <input
          type="text"
          value={plantName}
          onChange={(event) => setPlantName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Image with EXIF Data:
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmitForm;