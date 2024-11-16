
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://akankshasingh0085:vishu%40vishu@cluster0.xhsvl.mongodb.net/akku")

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  data: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', PostSchema);


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);

module.exports = {
  Post,
  User
};