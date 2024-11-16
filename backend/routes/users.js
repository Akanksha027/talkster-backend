const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authenticateToken');
const { User } = require('../db');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  console.log("Register route hit");
  console.log("Request body:", req.body);

  const { username, password } = req.body;

  const newUser = new User({ username, password });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ error: 'Failed to register user' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, "guptt_raaz", { expiresIn: '98h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});




router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = "guptt_raaz"; // Fallback for testing
    const decoded = jwt.verify(token, secret);

    // Find user by ID from the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user details (e.g., name and username)
    res.json({
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
});


module.exports = router;
