"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchTransactions, deleteTransaction, Transaction } from '@/api/transactionService';
import TransactionForm from '@/components/TransacaoForm';
import "./index.css"
import Navbar from '@/components/Navbar/Privada';

export default function TransactionsPage() {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    // Filtros simples (pode expandir depois)
    const [filterType, setFilterType] = useState('');

    const loadData = async () => {
        if (!token) return;
        try {
            const data = await fetchTransactions({ tipo: filterType || undefined });
            setTransactions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [token, filterType]);

    const handleEdit = (t: Transaction) => {
        setEditingTransaction(t);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir?')) return;
        try {
            await deleteTransaction(id);
            loadData();
        } catch (error) {
            alert('Erro ao excluir.');
        }
    };

    const handleSuccess = () => {
        setIsFormOpen(false);
        setEditingTransaction(null);
        loadData();
    };

    return (
        <main>
            <Navbar></Navbar>
            <div className="container">
                <div className="header">
                    <h1 className="title">Transações</h1>
                    <button className="addButton" onClick={() => { setEditingTransaction(null); setIsFormOpen(true); }}>
                        + Nova Transação
                    </button>
                </div>

                <div className="filters">
                    <select
                        className="filterSelect"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Todos os Tipos</option>
                        <option value="Receita">Receitas</option>
                        <option value="Despesa">Despesas</option>
                    </select>
                </div>

                {loading ? (
                    <p className="loading">Carregando...</p>
                ) : (
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="empty">Nenhuma transação encontrada.</td>
                                    </tr>
                                ) : (
                                    transactions.map((t) => (
                                        <tr key={t.id}>
                                            <td>{new Date(t.data).toLocaleDateString()}</td>
                                            <td>{t.descricao}</td>
                                            <td>
                                                <span className="categoryTag">{t.categoria?.nome || '-'}</span>
                                            </td>
                                            <td className={t.tipo === 'Receita' ? 'income' : 'expense'}>
                                                {t.tipo === 'Receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                                            </td>
                                            <td className="actions">
                                                <button onClick={() => handleEdit(t)} className="editBtn">✏️</button>
                                                <button onClick={() => handleDelete(t.id)} className="deleteBtn">🗑️</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {isFormOpen && (
                    <TransactionForm
                        transactionToEdit={editingTransaction}
                        onClose={() => setIsFormOpen(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </main>
    );
}