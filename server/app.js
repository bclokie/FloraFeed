// Declarations
require("dotenv").config();
const { ENVIROMENT, PORT, MONGODB_URI } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const Post = require('./db/post.model.js');
const catsRoutes = require("./routes/catsRoutes");
const User = require("./models/user");
const fileUpload = require('express-fileupload');



const app = express();

// Middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
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

// Alex code
  app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
// End of Alex code

//Corey code
app.use(cors());
app.use(express.json());
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
  
  
  //Mongoose connection
  mongoose.set('strictQuery', false);
  const mongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@finalproject.lsfq8aa.mongodb.net/leafly`;
  main().catch(err => console.log(err));
  async function main() {
    await mongoose.connect(mongoDB);
    if (mongoose.connection.readyState === 1) {
      console.log('Mongoose is connected')
    }
  }
  const {postSchema} = require('./db/post.model.js')
  
// End of Corey code

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



app.post("/submit", (req, res) => {
  console.log('this is req.files', req.files);
  Post.insertMany([{title: req.body.title, plantName: req.body.plantName, image: req.files.image.data, description: req.body.description}])
})
app.get("/submit", (req, res) => {
  Post.findById('641a0ad4a0c8691b2201d26c').lean()
  .then((post) => {
    console.log('')
    res.json(post)
  })
  .catch((err) => {
    console.log(err);
  });
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
