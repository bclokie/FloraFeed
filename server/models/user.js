const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  googleId: String,
  authMethod: String,
  avatar: String,
  createdAt: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
