import axios from "axios";
import { AuthResponse, LoginPayload, RegisterPayload } from '@/types';

// URL base do seu backend (assumindo que está na porta 3000)
// Em produção, isto viria de uma variável de ambiente (ex: process.env.NEXT_PUBLIC_API_URL)
const API_URL = 'http://localhost:3000/auth';


// Instância do Axios para as rotas de autenticação
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Chama a API de login (POST /auth/login)
 */
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/login', data);
    return response.data;
  } catch (error: any) {
    // Lança o erro específico do backend (ex: "Credenciais inválidas")
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Erro de rede ou servidor ao tentar fazer login.');
  }
};

/**
 * Chama a API de cadastro (POST /auth/register)
 */
export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  } catch (error: any) {
    // Lança o erro específico do backend (ex: "Email já em uso")
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Erro de rede ou servidor ao tentar cadastrar.');
  }
};