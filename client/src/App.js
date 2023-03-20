import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MapView from "./components/MapView";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import ListView from "./components/ListView";
import GridView from "./components/GridView";
import Login from "./components/Login/Login";
import axios from "axios";

const App = () => {
  const [view, setView] = useState("MAP");
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("");
  const login = () => {
    axios({
      method: "POST", 
      data: {
        email: loginEmail,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:8080/login"
    })
    .then((res) => console.log(res));
  }
  const register = () => {
    axios({
      method: "POST", 
      data: {
        email: registerEmail,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:8080/register"
    })
    .then((res) => console.log(res));
  }
  const getUser = () => {
    axios({
      method: "GET", 
      data: {
        email: registerEmail,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:8080/getUser"
    })
    .then((res) => console.log(res));
  }

  // const handleLogin = async (email, password) => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/login", {
  //       email,
  //       password,
  //     });

  //     if (response.status === 200) {
  //       setLoggedIn(true);
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  // if (!loggedIn) {
  //   return <Login onLogin={handleLogin} />;
  // }

  return (
    <div>
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
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
          </Container>
          <Sidebar />
          <Container
            sx={{
              width: "60%",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {view === "MAP" ? <MapView /> : ""}
            {view === "LIST" ? <ListView /> : ""}
            {view === "GRID" ? <GridView /> : ""}
          </Container>
          <Button>Test</Button>

        </>
        <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
        <div>
          <h1>Register</h1>
          <input placeholder="email" onChange={e => setRegisterEmail(e.target.value)}/>
          <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}/>
          <button onClick={register}>Submit</button>
        </div>
        <div>
          <h1>Login</h1>
          <input placeholder="username" onChange={e => setLoginEmail(e.target.value)}/>
          <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
          <button onClick={login}>Submit</button>
        </div>
        <div>
          <h1>Get User</h1>
          <input placeholder="username"/>
          <input placeholder="password"/>
          <button onClick={getUser}>Submit</button>
        </div>
        </Container>
    </div>
  );
};

export default App;
