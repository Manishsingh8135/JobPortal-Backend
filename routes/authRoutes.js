const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails, getAllUsers } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', loginUser);
// @route   GET api/auth/user/:userId
// @desc    Get user details by user ID
// @access  Private (only logged-in users should access this)
router.get('/user/:userId', getUserDetails);
router.get('/users', getAllUsers);
module.exports = router;
