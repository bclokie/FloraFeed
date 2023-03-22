import { Button, Container, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = ({ setView, handleToggleSidebar }) => {
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
        <IconButton onClick={handleToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Button
          variant="outlined"
          color="success"
          style={{ marginRight: "20px", marginLeft: "20px" }}
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
          startIcon={<AddIcon />}
        >
          New Post
        </Button>
      </div>
    </Container>
  );
};

export { Navigation };
