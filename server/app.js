require("dotenv").config();
const { ENVIROMENT, PORT, MONGODB_URI } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("./passport-config")(passport);
const session = require("express-session");
const Post = require("./db/post.model.js");
const User = require("./models/user");

const app = express();

// Middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.get("/", (req, res) => {
  res.json({ greetings: "hello world" });
});

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      authMethod: "local",
      avatar: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

require("./passport-config")(passport);
app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);

app.post("/submit", (req, res) => {
  Post.insertMany([
    {
      title: req.body.title,
      plantName: req.body.plantName,
      image: req.body.image,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      timestamps: true,
    },
  ]);
});

app.get("/posts", (req, res) => {
  Post.find({})
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
