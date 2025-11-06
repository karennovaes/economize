// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // CU00
router.post('/login', authController.login);       // CU00.1

module.exports = router;