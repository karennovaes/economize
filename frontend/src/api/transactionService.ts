import axios from 'axios';

// URL base do endpoint de transações
const API_URL = 'http://localhost:3000/transactions';

// Definição da interface da Transação (corresponde ao que o backend retorna)
export interface Transaction {
  id: string;
  valor: number;
  data: string; // ISO Date string
  descricao: string;
  tipo: 'Receita' | 'Despesa';
  id_categoria: string;
  categoria?: {
    nome: string;
  };
}

// Interface auxiliar para respostas que contêm um objeto 'transaction'
// (Usada no Create e Update)
interface TransactionResponse {
  message: string;
  transaction: Transaction;
}

// Definição dos dados necessários para criar/editar uma transação
export interface TransactionPayload {
  valor: number;
  data: string;
  descricao: string;
  id_categoria: string;
  tipo: 'Receita' | 'Despesa';
}

// Helper para obter os headers com o token de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autenticação não encontrado.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

/**
 * Lista as transações com filtros opcionais (RF04)
 * @param filters Objeto com filtros (mes, ano, tipo, categoriaId)
 */
export const fetchTransactions = async (filters: any = {}): Promise<Transaction[]> => {
  try {
    // CORREÇÃO: Adicionado <any[]> para dizer que o data é uma lista
    const response = await axios.get<any[]>(API_URL, {
      headers: getAuthHeaders(),
      params: filters,
    });
    
    // Garante que o valor venha como número (caso o backend envie string/decimal)
    return response.data.map((t) => ({
      ...t,
      valor: Number(t.valor),
    }));
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

/**
 * Cria uma nova transação 
 */
export const createTransaction = async (data: TransactionPayload): Promise<Transaction> => {
  try {
    //  Adicionado <TransactionResponse> para tipar o retorno
    const response = await axios.post<TransactionResponse>(API_URL, data, {
      headers: getAuthHeaders(),
    });
    return response.data.transaction;
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw error;
  }
};

/**
 * Atualiza uma transação existente (RF05)
 */
export const updateTransaction = async (id: string, data: Partial<TransactionPayload>): Promise<Transaction> => {
  try {
    // CORREÇÃO: Adicionado <TransactionResponse> para tipar o retorno
    const response = await axios.put<TransactionResponse>(`${API_URL}/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data.transaction;
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    throw error;
  }
};

/**
 * Remove uma transação (RF05)
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw error;
  }
};