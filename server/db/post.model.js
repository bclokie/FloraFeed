const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  scientificName: String,
  image: {
    data: Buffer,
    contentType: String
  },
  author: String,
  description: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;