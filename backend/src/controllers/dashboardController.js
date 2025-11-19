// src/controllers/dashboardController.js

const prisma = require('../config/db');

const getCurrentBalance = async (req, res) => {
    const usuarioId = req.usuarioId;
    
    try {
        // Usa 'groupBy' nativo do Prisma
        const aggregation = await prisma.transacao.groupBy({
            by: ['tipo'],
            _sum: {
                valor: true,
            },
            where: {
                id_usuario: usuarioId,
            },
        });

        let totalReceitas = 0;
        let totalDespesas = 0;

        aggregation.forEach(item => {
            // No MongoDB, o valor já vem como número (Float)
            const valor = item._sum.valor || 0;

            if (item.tipo === 'Receita') {
                totalReceitas = valor;
            } else if (item.tipo === 'Despesa') {
                totalDespesas = valor;
            }
        });

        const saldoAtual = totalReceitas - totalDespesas;

        res.status(200).json({
            totalReceitas: totalReceitas,
            totalDespesas: totalDespesas,
            saldoAtual: saldoAtual,
        });

    } catch (error) {
        console.error('Erro ao calcular saldo:', error);
        res.status(500).json({ error: 'Erro interno ao calcular saldo.' });
    }
};

// --- RELATÓRIO GRÁFICO DE DESPESAS  ---
const getExpenseSummary = async (req, res) => {
    const usuarioId = req.usuarioId;
    
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    try {
        // 1. Agrupar despesas por categoria usando Prisma nativo (Mais seguro que aggregateRaw)
        const groupResult = await prisma.transacao.groupBy({
            by: ['id_categoria'],
            _sum: {
                valor: true,
            },
            where: {
                id_usuario: usuarioId,
                tipo: 'Despesa',
                data: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });

        // 2. Se não houver despesas, retorna array vazio
        if (groupResult.length === 0) {
            return res.status(200).json([]);
        }

        // 3. Buscar os nomes das categorias correspondentes
        // (groupBy não suporta 'include', então fazemos em duas etapas)
        const categoryIds = groupResult.map(g => g.id_categoria);
        const categories = await prisma.categoria.findMany({
            where: {
                id: { in: categoryIds }
            },
            select: {
                id: true,
                nome: true
            }
        });

        // 4. Combinar os resultados (Valores + Nomes)
        const summary = groupResult.map(group => {
            const category = categories.find(c => c.id === group.id_categoria);
            return {
                id_categoria: group.id_categoria,
                totalGasto: group._sum.valor || 0,
                nomeCategoria: category ? category.nome : 'Categoria Desconhecida'
            };
        });
        
        res.status(200).json(summary);

    } catch (error) {
        console.error('Erro ao gerar resumo de despesas:', error);
        res.status(500).json({ error: 'Erro interno ao gerar relatório.' });
    }
};



module.exports = {
    getCurrentBalance,
    getExpenseSummary,
};