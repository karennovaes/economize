import axios from 'axios';

const API_URL = 'http://localhost:3000/categories';

export interface Category {
  id: string;
  nome: string;
  tipo: 'Receita' | 'Despesa';
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const createCategory = async (nome: string, tipo: 'Receita' | 'Despesa'): Promise<Category> => {
  try {
    const response = await axios.post<Category>(API_URL, { nome, tipo }, {
      headers: getAuthHeaders(),
    });
    return response.data; // O backend deve retornar { message, category } ou a categoria direta
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};