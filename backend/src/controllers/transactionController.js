// src/controllers/transactionController.js

const prisma = require('../config/db');

// --- C R E A T E (RF01, RF02) ---
// (Mantemos a função de criação que você já tinha)
const createTransaction = async (req, res) => {
    const usuarioId = req.usuarioId; 
    const { valor, data, descricao, id_categoria, tipo } = req.body;

    if (!valor || !data || !id_categoria || !tipo || !['Receita', 'Despesa'].includes(tipo)) {
        return res.status(400).json({ error: 'Dados da transação inválidos ou incompletos.' });
    }
    
    try {
        const newTransaction = await prisma.transacao.create({
            data: {
                valor: parseFloat(valor),
                data: new Date(data),
                descricao: descricao,
                tipo: tipo,
                id_usuario: usuarioId,       // Chave de isolamento
                id_categoria: id_categoria,
            },
        });

        res.status(201).json({ 
            message: 'Transação registrada com sucesso.', 
            transaction: newTransaction 
        });

    } catch (error) {
        console.error('Erro ao criar transação:', error);
        if (error.code === 'P2025') {
             return res.status(404).json({ error: 'Categoria especificada não encontrada.' });
        }
        res.status(500).json({ error: 'Erro interno ao registrar transação.' });
    }
};

// --- R E A D / L I S T (RF04) ---
const listTransactions = async (req, res) => {
    const usuarioId = req.usuarioId;
    // Parâmetros de filtro (query parameters)
    const { mes, ano, tipo, categoriaId } = req.query; 

    // Objeto base para a query de filtro
    const where = {
        id_usuario: usuarioId, // GARANTIA DE ISOLAMENTO (RNF03.1)
    };

    // 1. Filtro por Tipo (Receita/Despesa)
    if (tipo && ['Receita', 'Despesa'].includes(tipo)) {
        where.tipo = tipo;
    }

    // 2. Filtro por Categoria
    if (categoriaId) {
        where.id_categoria = categoriaId;
    }

    // 3. Filtro por Mês/Ano (Data)
    if (mes && ano) {
        const startDate = new Date(Number(ano), Number(mes) - 1, 1);
        const endDate = new Date(Number(ano), Number(mes), 1);
        where.data = {
            gte: startDate, // Maior ou igual ao primeiro dia do mês
            lt: endDate,    // Menor que o primeiro dia do próximo mês
        };
    }

    try {
        const transactions = await prisma.transacao.findMany({
            where: where,
            orderBy: {
                data: 'desc', // Ordena das mais recentes para as mais antigas
            },
            // Incluir informações da Categoria para o relatório visual
            include: {
                categoria: { 
                    select: { nome: true } 
                },
            },
        });

        res.status(200).json(transactions);

    } catch (error) {
        console.error('Erro ao listar transações:', error);
        res.status(500).json({ error: 'Erro interno ao buscar transações.' });
    }
};

// --- U P D A T E (RF05) ---
const updateTransaction = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params; // ID da transação na URL
    const { valor, data, descricao, id_categoria, tipo } = req.body;

    try {
        // 1. Atualiza e verifica se a transação pertence ao usuário logado
        const updatedTransaction = await prisma.transacao.update({
            where: {
                id: id,
                id_usuario: usuarioId, // Importante para segurança
            },
            data: {
                // Filtra apenas campos que foram fornecidos no body
                valor: valor !== undefined ? parseFloat(valor) : undefined,
                data: data !== undefined ? new Date(data) : undefined,
                descricao: descricao,
                tipo: tipo,
                id_categoria: id_categoria,
            },
        });

        res.status(200).json({ 
            message: 'Transação atualizada com sucesso.', 
            transaction: updatedTransaction 
        });

    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        // P2025 = Registro não encontrado (ou não pertence ao usuário)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Transação não encontrada ou acesso negado.' });
        }
        res.status(500).json({ error: 'Erro interno ao atualizar transação.' });
    }
};

// --- D E L E T E (RF05) ---
const deleteTransaction = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params; // ID da transação na URL

    try {
        // 1. Deleta e verifica se a transação pertence ao usuário
        await prisma.transacao.delete({
            where: {
                id: id,
                id_usuario: usuarioId, // Importante para segurança
            },
        });

        // 2. Resposta sem corpo (204 No Content)
        res.status(204).send(); 

    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        // P2025 = Registro não encontrado (ou não pertence ao usuário)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Transação não encontrada ou acesso negado.' });
        }
        res.status(500).json({ error: 'Erro interno ao deletar transação.' });
    }
};

// Exportar todas as funções para as rotas
module.exports = {
    createTransaction,
    listTransactions,
    updateTransaction,
    deleteTransaction,
};