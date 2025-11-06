// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// Rota para calcular e exibir o saldo atual
router.get('/balance', authMiddleware, dashboardController.getCurrentBalance); 

module.exports = router;