// declarations
require("dotenv").config();
const { ENVIROMENT, PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


// // declarations
// require("dotenv").config();
// const { ENVIROMENT, PORT } = process.env;
// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const passport = require("passport");
// const session = require("express-session");
// const cookieParser = require('cookie-parser');
// const { MongoKerberosError } = require("mongodb");
// const mongoose = require('mongoose');
// const User = require('./db/user')
// const bcrypt = require('bcryptjs');

// // const catsRoutes = require("./routes/catsRoutes");
// // const loginRoutes = require("./routes/loginRouter")
// // const registerRoutes = require("./routes/registerRouter")

// const app = express();

// mongoose.connect('mongodb+srv://coreysilver:GIKDi8gsM3Q8v7Op@leafly.7e17ock.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// // Middleware
// app.use(morgan(ENVIROMENT));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // app.use("/cats", catsRoutes);
// // app.use("/register", registerRoutes)
// // app.use("/login", loginRoutes)
// app.get("/", (req, res) => {
//   res.json({ greetings: "hello world" });
// });


// // app.use(express.json());
// // app.use(
// //   session({
// //     secret: "your_secret_key",
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// // );

// app.use(session({
//   secret: "secretcode",
//   resave: true,
//   saveUninitialized: true
// }))
// app.use(cookieParser("secretcode"))
// require('./authentication/passportConfig')(passport);
// app.use(passport.initialize());
// app.use(passport.session());


// // require("./passport-config")(passport);
// // app.use(passport.initialize());
// // app.use(passport.session());

// // app.post("/api/login", (req, res, next) => {
// //   passport.authenticate("local", (err, user, info) => {
// //     if (err) {
// //       return next(err);
// //     }
// //     if (!user) {
// //       return res.status(401).json({ message: info.message });
// //     }
// //     req.logIn(user, (err) => {
// //       if (err) {
// //         return next(err);
// //       }
// //       return res.status(200).json({ message: "Login successful" });
// //     });
// //   })(req, res, next);
// // });


// app.post('/register', async (req, res) => {
//   try {
//     const existingUser = await User.findOne({email: req.body.email});
//     if (existingUser) {
//       return res.status(400).send('User already exists');
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = new User({
//       email: req.body.email,
//       password: hashedPassword
//     });
//     await newUser.save();

//     res.send('User created');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });


// // app.post('/register', (req, res) => {
// //     User.findOne({email: req.body.email})
// //       .then(() => {
// //           const hashedPassword = bcrypt.hash(req.body.password, 10);
// //           const newUser = new User({
// //             email: req.body.email,
// //             password: hashedPassword
// //           })
// //           newUser.save()
// //           res.send("User Created")
// //       })
// //       // .then(() => {
// //       // })
// //     // if (user.err) {
// //     //   throw err
// //     // }
// //     // if (doc) {
// //     //   res.send('User already exists');
// //     // }
// //     // if (!doc) {
// //     //   const newUser = new User({
// //     //     username: req.body.username,
// //     //     password: req.body.password
// //     //   })
// //     //   .then(() => {
// //     //     newUser.save();
// //     //     res.send("User Created")
// //     //   })
// //     // }
// // });

// app.post('/login', (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) {
//       res.send("No User Exists");
//       console.log(user);
//     }
//     else {
//       req.logIn(user, err => {
//         if (err) throw err;
//         res.send("Success");
//       })
//     }
//   })
// });
  
  

// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
