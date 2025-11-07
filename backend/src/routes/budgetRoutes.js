// src/routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const budgetController = require('../controllers/budgetController');

// Todas as rotas usam o middleware JWT

// Listar todos os orçamentos do usuário
router.get('/', authMiddleware, budgetController.listBudgets); 

// Criar novo orçamento
router.post('/', authMiddleware, budgetController.createBudget);

// Atualizar orçamento existente
router.put('/:id', authMiddleware, budgetController.updateBudget);

// Excluir orçamento
router.delete('/:id', authMiddleware, budgetController.deleteBudget);

module.exports = router;