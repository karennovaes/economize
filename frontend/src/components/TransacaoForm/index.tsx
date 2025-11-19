"use client";
import React, { useState, useEffect } from 'react';
import { createTransaction, updateTransaction, Transaction, TransactionPayload } from '@/api/transactionService';
import { fetchCategories, Category } from '@/api/categoryService';
import "./index.css";

interface TransactionFormProps {
  transactionToEdit?: Transaction | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TransactionForm({ transactionToEdit, onClose, onSuccess }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionPayload>({
    descricao: '',
    valor: 0,
    data: new Date().toISOString().split('T')[0], // Data de hoje YYYY-MM-DD
    tipo: 'Despesa',
    id_categoria: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar categorias ao montar o componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        // Se não for edição, define a primeira categoria compatível como padrão
        if (!transactionToEdit && data.length > 0) {
           // Tenta achar uma categoria do tipo padrão 'Despesa'
           const defaultCat = data.find(c => c.tipo === 'Despesa');
           if (defaultCat) setFormData(prev => ({ ...prev, id_categoria: defaultCat.id }));
        }
      } catch (err) {
        setError('Erro ao carregar categorias.');
      }
    };
    loadCategories();
  }, [transactionToEdit]);

  // Preencher formulário se for edição
  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        descricao: transactionToEdit.descricao,
        valor: transactionToEdit.valor,
        data: new Date(transactionToEdit.data).toISOString().split('T')[0],
        tipo: transactionToEdit.tipo,
        id_categoria: transactionToEdit.id_categoria,
      });
    }
  }, [transactionToEdit]);

  // Filtrar categorias baseadas no tipo selecionado (Receita vs Despesa)
  const filteredCategories = categories.filter(c => c.tipo === formData.tipo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.id_categoria) {
        throw new Error('Selecione uma categoria.');
      }

      if (transactionToEdit) {
        await updateTransaction(transactionToEdit.id, formData);
      } else {
        await createTransaction(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar transação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="title">
          {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
        </h2>
        
        <form onSubmit={handleSubmit} className="form">
          
          {/* Tipo */}
          <div className="formGroup">
            <label className="label">Tipo</label>
            <select 
              className="select"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'Receita' | 'Despesa', id_categoria: '' })}
            >
              <option value="Despesa">Despesa</option>
              <option value="Receita">Receita</option>
            </select>
          </div>

          {/* Descrição */}
          <div className="formGroup">
            <label className="label">Descrição</label>
            <input 
              className="input"
              type="text" 
              required 
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Ex: Compras no mercado"
            />
          </div>

          <div className="row">
            {/* Valor */}
            <div className="formGroup" style={{ flex: 1 }}>
              <label className="label">Valor (R$)</label>
              <input 
                className="input"
                type="number" 
                required 
                min="0.01" 
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
              />
            </div>

            {/* Data */}
            <div className="formGroup" style={{ flex: 1 }}>
              <label className="label">Data</label>
              <input 
                className="input"
                type="date" 
                required 
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>
          </div>

          {/* Categoria */}
          <div className="formGroup">
            <label className="label">Categoria</label>
            <select 
              className="select"
              required 
              value={formData.id_categoria}
              onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value })}
            >
              <option value="">Selecione...</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
            {filteredCategories.length === 0 && (
               <small className="error">Nenhuma categoria encontrada para {formData.tipo}.</small>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="actions">
            <button type="button" onClick={onClose} className="button btnCancel">Cancelar</button>
            <button type="submit" disabled={loading} className="button btnSave">
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}