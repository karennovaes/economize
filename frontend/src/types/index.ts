// Este ficheiro define os tipos de dados partilhados

export interface User {
  id: string;
  nome: string;
  email: string;
}

// O que a API de /auth/login ou /auth/register retorna
export interface AuthResponse {
  token: string;
  user: User;
  message?: string; // Mensagem opcional
}

// O que a função loginUser precisa
export interface LoginPayload {
  email: string;
  senha: string;
}

// O que a função registerUser precisa
export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

// O que o AuthContext vai guardar e partilhar
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}