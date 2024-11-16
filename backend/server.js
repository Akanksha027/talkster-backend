const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this is at the top

const connectDB = require('./db'); // Import connectDB from db.js
const postRoutes = require('./routes/posts'); // Import post routes
const userRoutes = require('./routes/users'); // Import user routes
const authenticateToken = require('./middlewares/authenticateToken'); // Token middleware

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;

// Connect to the database
connectDB(); // Call the function once



// Test route to check MongoDB connection
app.get('/test-db', async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      throw new Error('Database is not connected');
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    res.status(200).send({ message: 'Connected to MongoDB Atlas!', collections });
  } catch (error) {
    console.error('Error in /test-db:', error.message);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});


// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/protected', authenticateToken, (req, res) => {
  res.send({ message: 'This is a protected route' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
