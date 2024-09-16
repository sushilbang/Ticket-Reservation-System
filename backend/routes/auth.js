// /routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ msg: 'Protected content', user: req.user });
});

module.exports = router;
