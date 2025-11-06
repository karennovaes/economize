// src/controllers/categoryController.js

const prisma = require('../config/db');

// --- C R E A T E (RF06) ---
const createCategory = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { nome, tipo } = req.body;

    if (!nome || !tipo || !['Receita', 'Despesa'].includes(tipo)) {
        return res.status(400).json({ error: 'Nome e tipo (Receita/Despesa) são obrigatórios.' });
    }

    try {
        const newCategory = await prisma.categoria.create({
            data: {
                nome: nome,
                tipo: tipo,
                id_usuario: usuarioId, // Associa ao usuário logado
            },
        });

        res.status(201).json({ 
            message: 'Categoria criada com sucesso.', 
            category: newCategory 
        });

    } catch (error) {
        // P2002: Violação de UNIQUE constraint (usuário já tem uma categoria com esse nome)
        if (error.code === 'P2002') { 
            return res.status(409).json({ error: 'Você já possui uma categoria com esse nome.' });
        }
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro interno ao criar categoria.' });
    }
};

// --- R E A D / L I S T (RF06) ---
const listCategories = async (req, res) => {
    const usuarioId = req.usuarioId;
    
    try {
        // Filtra todas as categorias para o usuário logado
        const categories = await prisma.categoria.findMany({
            where: { id_usuario: usuarioId },
            orderBy: { nome: 'asc' },
        });

        res.status(200).json(categories);

    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro interno ao buscar categorias.' });
    }
};

// --- D E L E T E (RF06) ---
const deleteCategory = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;

    try {
        // Tenta deletar a categoria se ela pertencer ao usuário
        await prisma.categoria.delete({
            where: {
                id: id,
                id_usuario: usuarioId,
            },
        });

        res.status(204).send(); 

    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        // P2025 = Registro não encontrado (ou acesso negado)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Categoria não encontrada ou acesso negado.' });
        }
        // Se a categoria estiver em uso por uma transação, o BD falhará
        // (Isso depende da sua configuração onDelete no schema.prisma, que usamos RESTRICT)
        if (error.code === 'P2003') { // P2003 = Foreign Key Constraint failed
            return res.status(409).json({ error: 'Esta categoria não pode ser excluída pois está vinculada a uma ou mais transações.' });
        }
        res.status(500).json({ error: 'Erro interno ao deletar categoria.' });
    }
};

module.exports = {
    createCategory,
    listCategories,
    deleteCategory,
};