import axios from 'axios';

const API_URL = 'http://localhost:3000/categories';

export interface Category {
  id: string;
  nome: string;
  tipo: 'Receita' | 'Despesa';
}

// Interface para tipar a resposta do backend na criação
interface CreateCategoryResponse {
  message: string;
  category: Category;
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
    // CORREÇÃO: Tipar a resposta como CreateCategoryResponse
    const response = await axios.post<CreateCategoryResponse>(API_URL, { nome, tipo }, {
      headers: getAuthHeaders(),
    });
    
    // Retornar apenas o objeto 'category' de dentro da resposta
    return response.data.category; 
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};