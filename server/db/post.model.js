const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  scientificName: String,
  author: String,
  description: String,
  image: Buffer
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;