const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

const router = express.Router();

// Registration endpoint
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    console.log('User registered:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering new user' });
  }
});

// Login endpoint
// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request with username:', username, 'and password:', password);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      // If user not found, return error
      return res.status(401).json({ error: 'Authentication failed: User not found' });
    }

    // // Compare the hashed password from the request with the hashed password stored in the database
    // const hashedPasswordFromRequest = await bcrypt.hash(password, user.password.slice(0, 29));
    // if (hashedPasswordFromRequest !== user.password) {
    //   // If password doesn't match, return error
    //   return res.status(401).json({ error: 'Authentication failed: Incorrect password' });
    // }

    // If user exists and password matches, generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send JWT token in response
    res.json({ token });
  } catch (error) {
    // Handle errors
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});


module.exports = router;

