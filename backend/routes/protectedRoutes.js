// backend/routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/role');

// @route   GET /api/protected/user
// @desc    Accessible to any logged-in user
router.get('/user', authMiddleware, (req, res) => {
  res.json({
    message: `Hello, ${req.user.role}! You are authenticated.`,
    user: req.user
  });
});

// @route   GET /api/protected/admin
// @desc    Accessible only to admin users
router.get('/admin', authMiddleware, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! This route is restricted.' });
});

// @route   GET /api/protected/teacher
// @desc    Accessible only to teacher users
router.get('/teacher', authMiddleware, checkRole('teacher'), (req, res) => {
  res.json({ message: 'Welcome Teacher! This route is restricted.' });
});

module.exports = router;
