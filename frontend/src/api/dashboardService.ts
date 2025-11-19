import axios from 'axios';

// URL base do endpoint de dashboard
const API_URL = 'http://localhost:3000/dashboard';

// Definição dos tipos de dados (interfaces)
export interface BalanceData {
  totalReceitas: number;
  totalDespesas: number;
  saldoAtual: number;
}

export interface ExpenseSummary {
  id_categoria: string;
  totalGasto: number;
  nomeCategoria: string;
}

/**
 * Obtém o saldo atual (Receitas - Despesas)
 * @param token Token JWT para autenticação
 */
export const fetchBalance = async (token: string): Promise<BalanceData> => {
  try {
    const response = await axios.get<BalanceData>(`${API_URL}/balance`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Garante que os valores venham como números
    return {
      totalReceitas: Number(response.data.totalReceitas),
      totalDespesas: Number(response.data.totalDespesas),
      saldoAtual: Number(response.data.saldoAtual),
    };
  } catch (error) {
    console.error('Erro ao buscar saldo:', error);
    throw error;
  }
};

/**
 * Obtém o resumo de despesas por categoria para o gráfico
 * @param token Token JWT para autenticação
 */
export const fetchExpenseSummary = async (token: string): Promise<ExpenseSummary[]> => {
  try {
    const response = await axios.get<ExpenseSummary[]>(`${API_URL}/expense-summary`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Mapeia para garantir que totalGasto seja número
    return response.data.map((item) => ({
      ...item,
      totalGasto: Number(item.totalGasto),
    }));
  } catch (error) {
    console.error('Erro ao buscar resumo de despesas:', error);
    throw error;
  }
};