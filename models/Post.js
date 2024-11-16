const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  data: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;