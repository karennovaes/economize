"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Importamos o hook de autenticação
import { useRouter } from 'next/navigation';
import { fetchBalance, fetchExpenseSummary } from '@/api/dashboardService';
import { fetchTransactions, Transaction } from '@/api/transactionService';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

import "./index.css"
import Navbar from '@/components/Navbar/Privada';
import Link from 'next/link';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BalanceData { totalReceitas: number; totalDespesas: number; saldoAtual: number; }
interface ExpenseSummary { totalGasto: number; nomeCategoria: string; }

/**
 * Esta é uma Rota Protegida.
 * Ela verifica se o utilizador está logado usando o AuthContext.
 * Se não estiver, redireciona para a página de login.
 */

export default function DashboardPage() {
  // Obtemos o estado de autenticação do contexto global
  const { user, token, logout } = useAuth();


  // Estados para os dados
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [summary, setSummary] = useState<ExpenseSummary[] | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]); // Estado para transações

  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    if (!token) return;

    try {
      // Carregamos tudo em paralelo: Saldo, Gráfico e Lista de Transações
      const [balanceData, summaryData, transactionsData] = await Promise.all([
        fetchBalance(token),
        fetchExpenseSummary(token),
        fetchTransactions({}) // Busca todas (vamos cortar as 5 primeiras no frontend por simplicidade)
      ]);

      setBalance(balanceData);
      setSummary(summaryData);
      // Pega apenas as 5 primeiras (assumindo que a API retorna ordenado por data desc)
      setRecentTransactions(transactionsData.slice(0, 5));

    } catch (err: any) {
      console.error("Erro ao carregar dashboard:", err);
      if (err.response?.status === 401) {
        logout();
      }
      setError('Falha ao carregar dados do dashboard.');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  if (loadingData) return <div className="loadingText">A carregar o seu resumo financeiro...</div>;
  if (error) return <div className="errorText">{error}</div>;
  if (!balance) return <div className="">Sem dados disponíveis.</div>;

  // Configuração do Gráfico
  const chartLabels = summary?.map(s => s.nomeCategoria) || [];
  const chartDataValues = summary?.map(s => s.totalGasto) || [];

  const generateRandomColor = () => `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  const backgroundColors = chartDataValues.map(() => generateRandomColor());

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Total Gasto (R$)',
        data: chartDataValues,
        backgroundColor: backgroundColors,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    
    <div className="container">
      <Navbar></Navbar>
      {/* Cabeçalho */}
      <header className="header">
        <h1 className="title">
          Olá, <span className="highlight">{user?.nome || 'Usuário'}</span>!
        </h1>
        <p className="subtitle">Aqui está o resumo das suas finanças este mês.</p>
      </header>

      {/* Grid de Cartões (KPIs) */}
      <div className="summaryGrid">
        <div className="card cardIncome">
          <span className="cardTitle">Receitas Totais</span>
          <span className="cardValue">R$ {balance.totalReceitas.toFixed(2)}</span>
        </div>
        <div className="card cardExpense">
          <span className="cardTitle">Despesas Totais</span>
          <span className="cardValue">R$ {balance.totalDespesas.toFixed(2)}</span>
        </div>
        <div className="card cardBalance">
          <span className="cardTitle">Saldo Atual</span>
          <span className= "cardValue">R$ {balance.saldoAtual.toFixed(2)}</span>
        </div>
      </div>

      {/* Área Principal Dividida (Gráfico + Transações Recentes) */}
      <div className="mainContentGrid">
        
        {/* Secção 1: Gráfico */}
        <div className="chartSection">
          <div className="sectionHeader">
            <h3 className="sectionTitle">Distribuição de Despesas</h3>
          </div>
          
          {summary && summary.length > 0 ? (
            <div className="chartContainer">
              <Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          ) : (
            <p className="emptyState">Sem despesas este mês.</p>
          )}
        </div>

        {/* Secção 2: Últimas Transações */}
        <div className="transactionsSection">
          <div className="sectionHeader">
            <h3 className="sectionTitle">Últimas Transações</h3>
            <Link href="/transacoes" className="viewAllLink">Ver todas</Link>
          </div>

          {recentTransactions.length > 0 ? (
            <ul className="transactionList">
              {recentTransactions.map((t) => (
                <li key={t.id} className="transactionItem">
                  <div className="transactionInfo">
                    <span className="transactionDesc">{t.descricao}</span>
                    <div className="transactionMeta">
                      <span>{new Date(t.data).toLocaleDateString()}</span>
                      {t.categoria?.nome && (
                        <span className="categoryTag">{t.categoria.nome}</span>
                      )}
                    </div>
                  </div>
                  <span className={`'transactionAmount ' ${t.tipo === 'Receita' ? 'income' : 'expense'}`}>
                    {t.tipo === 'Receita' ? '+ ' : '- '}
                    R$ {t.valor.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="emptyState">Nenhuma transação recente.</p>
          )}
        </div>

      </div>
    </div>
  );


}