// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Importa a proteção
const transactionController = require('../controllers/transactionController');

// Todas as rotas abaixo usam o authMiddleware para garantir o login

// Listar Transações (Leitura)
router.get('/', authMiddleware, transactionController.listTransactions); 

// Criar Nova Transação ( Criação)
router.post('/', authMiddleware, transactionController.createTransaction);

// Atualizar Transação (Atualização)
router.put('/:id', authMiddleware, transactionController.updateTransaction);

// Excluir Transação (Exclusão)
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;