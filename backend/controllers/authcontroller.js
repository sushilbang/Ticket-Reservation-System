const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: 'User already exists'
            });
        }

        // Generate a unique userID
        const userID = new mongoose.Types.ObjectId().toString();

         user = new User({ name, email, password}); // Add userID to user

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userID: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            msg: 'User registered successfully',
            token // Send token to the client
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }
        if (password !== user.password) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userID: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            msg: 'Login Successful',
            token // Send token to the client
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
