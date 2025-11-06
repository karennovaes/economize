// src/controllers/budgetController.js

const prisma = require('../config/db');

// --- C R E A T E (RF07) ---
const createBudget = async (req, res) => {
    const usuarioId = req.usuarioId;
    // id_categoria, valor_limite, mes, ano
    const { id_categoria, valor_limite, mes, ano } = req.body;

    if (!id_categoria || !valor_limite || !mes || !ano) {
        return res.status(400).json({ error: 'Todos os campos (categoria, limite, mês e ano) são obrigatórios.' });
    }

    try {
        // Validação RNF07: Evita orçamentos duplicados para a mesma Categoria/Mês/Ano
        const existingBudget = await prisma.orcamento.findFirst({
            where: {
                id_usuario: usuarioId,
                id_categoria: id_categoria,
                mes: Number(mes),
                ano: Number(ano),
            },
        });

        if (existingBudget) {
            return res.status(409).json({ error: 'Já existe um orçamento definido para esta categoria neste período.' });
        }

        const newBudget = await prisma.orcamento.create({
            data: {
                id_usuario: usuarioId,
                id_categoria: id_categoria,
                valor_limite: parseFloat(valor_limite),
                mes: Number(mes),
                ano: Number(ano),
            },
        });

        res.status(201).json({ 
            message: 'Orçamento criado com sucesso.', 
            budget: newBudget 
        });

    } catch (error) {
        console.error('Erro ao criar orçamento:', error);
        // Pode ser erro de categoria não encontrada (P2003 ou P2025 dependendo do tipo de erro)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Categoria especificada não encontrada.' });
        }
        res.status(500).json({ error: 'Erro interno ao criar orçamento.' });
    }
};

// --- R E A D / L I S T (RF07) ---
const listBudgets = async (req, res) => {
    const usuarioId = req.usuarioId;

    try {
        const budgets = await prisma.orcamento.findMany({
            where: { id_usuario: usuarioId },
            orderBy: { ano: 'desc', mes: 'desc' },
            include: {
                categoria: { 
                    select: { nome: true, tipo: true } 
                },
            },
        });

        // Opcional, mas útil: Incluir o GASTO ATUAL para cada orçamento (Monitoramento RF07)
        const budgetsWithUsage = await Promise.all(budgets.map(async (budget) => {
            
            // 1. Calcula o gasto (ou receita) acumulado para a categoria no mês/ano
            const aggregation = await prisma.transacao.aggregate({
                _sum: { valor: true },
                where: {
                    id_usuario: usuarioId,
                    id_categoria: budget.id_categoria,
                    tipo: budget.categoria.tipo, // Importante: Garante que só Despesa monitora Despesa
                    mes: budget.mes,
                    ano: budget.ano,
                    // Não é nativo do Prisma, deve ser feito com Date, mas para simplicidade vamos usar Mes/Ano do model
                },
            });

            const totalGasto = aggregation._sum.valor ? aggregation._sum.valor.toNumber() : 0;
            const porcentagemUsada = (totalGasto / budget.valor_limite) * 100;

            // 2. Define o status do alerta (RF08)
            let status = 'Dentro do Limite';
            if (porcentagemUsada > 100) {
                status = 'LIMITE EXCEDIDO'; // Alerta crítico
            } else if (porcentagemUsada >= 80) {
                status = 'Aproximando do Limite'; // Alerta de aviso
            }

            return {
                ...budget,
                totalGasto,
                porcentagemUsada: parseFloat(porcentagemUsada.toFixed(2)),
                statusAlerta: status,
            };
        }));
        
        res.status(200).json(budgetsWithUsage);

    } catch (error) {
        console.error('Erro ao listar orçamentos:', error);
        res.status(500).json({ error: 'Erro interno ao buscar orçamentos.' });
    }
};

// --- U P D A T E (RF07) ---
const updateBudget = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;
    const { valor_limite } = req.body; // Geralmente só o limite é atualizado

    if (!valor_limite) {
        return res.status(400).json({ error: 'O valor limite é obrigatório para atualização.' });
    }

    try {
        const updatedBudget = await prisma.orcamento.update({
            where: {
                id: id,
                id_usuario: usuarioId, // Garante isolamento e segurança
            },
            data: {
                valor_limite: parseFloat(valor_limite),
            },
        });

        res.status(200).json({ 
            message: 'Orçamento atualizado com sucesso.', 
            budget: updatedBudget 
        });

    } catch (error) {
        console.error('Erro ao atualizar orçamento:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Orçamento não encontrado ou acesso negado.' });
        }
        res.status(500).json({ error: 'Erro interno ao atualizar orçamento.' });
    }
};

// --- D E L E T E (RF07) ---
const deleteBudget = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;

    try {
        await prisma.orcamento.delete({
            where: {
                id: id,
                id_usuario: usuarioId, // Garante isolamento e segurança
            },
        });

        res.status(204).send(); 

    } catch (error) {
        console.error('Erro ao deletar orçamento:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Orçamento não encontrado ou acesso negado.' });
        }
        res.status(500).json({ error: 'Erro interno ao deletar orçamento.' });
    }
};

module.exports = {
    createBudget,
    listBudgets,
    updateBudget,
    deleteBudget,
};