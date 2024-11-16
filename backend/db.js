const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from the .env file

const connectDB = async () => {
  const uri = process.env.MONGODB_URI; // Access the MongoDB URI from .env

  if (!uri) {
    console.error("❌ MongoDB URI is missing in the .env file!");
    process.exit(1); // Exit the process if the URI is missing
  }

  try {
    // Connect to MongoDB with appropriate options
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB Atlas:', err.message);
    process.exit(1); // Exit the process on failure to connect
  }
};

// Listen to events on the connection to provide debugging feedback
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose connection is disconnected');
});

// Optional: Handle process termination gracefully
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 Mongoose connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;
