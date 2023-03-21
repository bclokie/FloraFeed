const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  favourites: Array
});

const Post = mongoose.model('User', userSchema);

module.exports = User;