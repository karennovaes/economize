"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';

// 1. Criar o Contexto
// O valor 'undefined' é usado para verificar se o Provider está a ser usado corretamente
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Criar o Provedor (Provider)
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de loading para verificar o localStorage

  // Efeito para carregar o estado do localStorage ao iniciar a aplicação
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Falha ao carregar dados de autenticação do localStorage", error);
      // Limpa o localStorage se os dados estiverem corrompidos
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false); // Termina o loading inicial
    }
  }, []); // O array vazio [] significa que isto só corre uma vez

  // Função de Login: atualiza o estado e guarda no localStorage
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Função de Logout: limpa o estado e o localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Não renderiza nada até que a verificação inicial do localStorage esteja completa
  if (loading) {
    return null; // Ou um ecrã de loading global
  }

  const contextValue: AuthContextType = {
    user,
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook customizado para facilitar o uso do contexto noutros componentes
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Este erro acontece se tentar usar o 'useAuth' fora de um <AuthProvider>
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};