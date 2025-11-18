"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // Importamos o hook de autenticação
import { useRouter } from 'next/navigation';

import "./index.css"
import Navbar from '@/components/Navbar/Privada';
import Sidebar from '@/components/Sidebar';

/**
 * Esta é uma Rota Protegida.
 * Ela verifica se o utilizador está logado usando o AuthContext.
 * Se não estiver, redireciona para a página de login.
 */

export default function DashboardPage() {
    // Obtemos o estado de autenticação do contexto global
    const { user, isLoggedIn, logout, loading } = useAuth();
    const router = useRouter();
    // Este useEffect protege a rota
    useEffect(() => {
        // Espera o AuthContext terminar de carregar (verificar o localStorage)
        if (loading) {
            return; // Ainda a carregar, não faz nada
        }

        // Se não estiver logado E não estiver a carregar, redireciona
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [loading, isLoggedIn, router]); // Dependências do efeito

    // Função para fazer logout
    const handleLogout = () => {
        logout();
        router.push('/login'); // Envia de volta para o login
    };

    // Se o contexto ainda estiver a carregar, mostramos um loading
    if (loading) {
        // 2. Usar className do CSS Module
        return <p className="loadingText">A verificar autenticação...</p>;
    }
      // Se estiver logado, mostramos o conteúdo
  return (
    isLoggedIn && user && (
      // 2. Usar className do CSS Module
      <main className="container">
        <Navbar></Navbar>
        <div className="header">
          <h1 className="title">Dashboard Economize</h1>

        </div>
        <Sidebar></Sidebar>
        <h2>Olá, {user.nome}!</h2>
        <p>Bem-vindo ao seu painel de controlo financeiro.</p>

        {/* (Aqui entra o conteúdo do seu dashboard, gráficos, etc.) */}
      </main>
    )
  );


}