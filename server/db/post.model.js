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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;