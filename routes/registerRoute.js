const express = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email,num, password ,dob} = req.body;
  
    try {
      // Create new user instance
      const user = new User({ name, email,num, password ,dob});
      await user.save();
  
      // Sign the JWT token, only including essential user information (user ID)
      const token = jwt.sign(
        { id: user._id }, // Only include user ID in the token
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      // Set the token in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true });
      console.log("login redirect")
      // Redirect to the dashboard after successful registration
      res.redirect('/login');
    } catch (err) {
      console.error(err);  // Log the error for debugging
      res.status(400).send('Error registering');
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/Coding');
  } catch (err) {
    res.status(500).send('Server error');
  }
});
router.get('/')

// Logout
router.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');
  });
module.exports = router;
