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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '98h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

module.exports = router;
