// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');

// Todas as rotas usam o middleware JWT

// Listar todas as categorias (Leitura)
router.get('/', authMiddleware, categoryController.listCategories); 

// Criar nova categoria (Criação)
router.post('/', authMiddleware, categoryController.createCategory);

// Excluir categoria (Exclusão)
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;