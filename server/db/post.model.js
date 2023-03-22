const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  plantName: String,
  image: String,
  author: String,
  description: String,
  latitude: Number,
  longitude: Number
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;