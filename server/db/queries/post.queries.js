const Post = require('./post.model');

const getAllPosts = (callback) => {
  Post.find({}, (err, posts) => {
    if (err) {
      callback(err);
    } else {
      callback(null, posts);
    }
  });
};

module.exports = { getAllPosts };