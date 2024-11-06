const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookieParser = require('cookie-parser'); 

const app = express();
app.use(cookieParser()); // Add cookie-parser middleware

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("login route");

    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.redirect('/login');  // Redirect back to login if user not found
        }

        // Compare the password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log("Password does not match");
            return res.redirect('/login');  // Redirect back to login if password doesn't match
        }

        // If login successful, sign the JWT and set it as a cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("JWT token: ", token);

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });

        // Redirect to the protected route after successful login
        return res.redirect('/Users/Coding');
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).send("Internal server error.");
    }
});

module.exports = router;
