const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from the .env file

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;  // Access the MongoDB URI from .env

  if (!uri) {
    console.error("MongoDB URI is missing in the .env file!");
    return;
  }

  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
  }
};

module.exports = connectDB;
