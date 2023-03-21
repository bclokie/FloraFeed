// declarations
require("dotenv").config();
const { ENVIROMENT, PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const Post = require('./db/post.model.js');
const catsRoutes = require("./routes/catsRoutes");

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use("/cats", catsRoutes);

app.get("/", (req, res) => {
  res.json({ greetings: "hello world" });
});

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
  const Post = mongoose.model('Post');
  

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});



app.post("/submit", (req, res) => {
  console.log(req.body)
})
app.get("/submit", (req, res) => {
  Post.find({})
    .then(posts => {
      console.log(posts);
    })
    .catch(err => {
      console.error(err);
    });
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
