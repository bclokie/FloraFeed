const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  favourites: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;