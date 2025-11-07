// src/controllers/dashboardController.js

const prisma = require('../config/db');

// --- CÁLCULO DE SALDO (RF03) ---
const getCurrentBalance = async (req, res) => {
    const usuarioId = req.usuarioId;
    
    try {
        // 1. Agrega o total de Receitas e Despesas do usuário logado
        const aggregation = await prisma.transacao.aggregate({
            _sum: {
                valor: true,
            },
            where: {
                id_usuario: usuarioId,
            },
            by: ['tipo'], // Agrupa por Receita ou Despesa
        });

        // 2. Processa os resultados para calcular o saldo
        let totalReceitas = 0;
        let totalDespesas = 0;

        aggregation.forEach(item => {
            const valor = item._sum.valor;

            if (item.tipo === 'Receita' && valor) {
                totalReceitas = valor.toNumber(); // Converte Decimal para Number
            } else if (item.tipo === 'Despesa' && valor) {
                totalDespesas = valor.toNumber(); // Converte Decimal para Number
            }
        });

        const saldoAtual = totalReceitas - totalDespesas;

        // 3. Resposta com o Saldo
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

module.exports = {
    getCurrentBalance,
};