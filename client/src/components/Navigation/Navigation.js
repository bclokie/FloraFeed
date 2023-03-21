import React from "react";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Navigation = ({ setView }) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px",
        marginLeft: "10%",
      }}
    >
      <div>
        <Button
          variant="outlined"
          color="success"
          style={{ marginRight: "20px" }}
          onClick={() => setView("GRID")}
        >
          Grid
        </Button>
        <Button
          variant="outlined"
          color="success"
          style={{ marginRight: "20px" }}
          onClick={() => setView("LIST")}
        >
          List
        </Button>
        <Button
          variant="outlined"
          color="success"
          style={{ marginRight: "20px" }}
          onClick={() => setView("MAP")}
        >
          Map
        </Button>
      </div>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          onClick={() => setView("SubmitForm")}
          sx={{ marginLeft: "auto" }}
          startIcon={<AddIcon />}
        >
          New Post
        </Button>
      </div>
    </Container>
  );
};

export default Navigation;
