"use client";
import React, { useState, useEffect } from 'react';
import { createTransaction, updateTransaction, Transaction, TransactionPayload } from '@/api/transactionService';
import { fetchCategories, Category, createCategory, deleteCategory } from '@/api/categoryService';
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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

  // Estados para UX de Categoria
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false); 
  const [newCategoryName, setNewCategoryName] = useState('');
  const [catActionLoading, setCatActionLoading] = useState(false);

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

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    setCatActionLoading(true);
    try {
      // Cria a categoria com o mesmo tipo da transação atual
      const newCat = await createCategory(newCategoryName, formData.tipo);
      
      // Adiciona à lista local
      setCategories(prev => [...prev, newCat]);
      
      // Seleciona a nova categoria automaticamente
      setFormData(prev => ({ ...prev, id_categoria: newCat.id }));
      
      // Limpa o estado de criação
      setIsCreatingCategory(false);
      setNewCategoryName('');
    } catch (err) {
      alert('Erro ao criar categoria. Tente novamente.');
    } finally {
      setCatActionLoading(false);
    }
  };
    // Função para deletar categoria
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    setCatActionLoading(true);
    try {
      await deleteCategory(id);
      
      // Remove da lista local
      setCategories(prev => prev.filter(c => c.id !== id));
      
      // Se a categoria deletada estava selecionada, limpa a seleção
      if (formData.id_categoria === id) {
        setFormData(prev => ({ ...prev, id_categoria: '' }));
      }
    } catch (err) {
      alert('Erro ao excluir. Verifique se a categoria está em uso.');
    } finally {
      setCatActionLoading(false);
    }
  };

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
          {/* Categoria com Criação Inline */}
          <div className="formGroup">
            <label className="label">Categoria</label>

          </div>


          {/* Categoria */}
          <div className="formGroup">
            
            <select
              className="select"
              required
              value={formData.id_categoria}
              onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value})}
              disabled={isCreatingCategory} // Desabilita enquanto cria
            >
              <option value="">Selecione...</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
            {/* UI de Criação de Categoria */}

             {isCreatingCategory ? (
              <div className="newCategoryContainer">
                <input 
                  type="text" 
                  className="miniInput"
                  placeholder="Nome da nova categoria"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button" 
                  onClick={handleCreateCategory} 
                  disabled={catActionLoading}
                  className="miniBtn btnConfirm"
                >
                  {catActionLoading ? '...' : 'OK'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsCreatingCategory(false)} 
                  className="miniBtn btnDiscard"
                >
                  X
                </button>
              </div>
            ) : (
              <span 
                className="categoryLink"
                onClick={() => setIsCreatingCategory(true)}
              >
                + Criar nova categoria de {formData.tipo}
              </span>
            )}

            {!isCreatingCategory && filteredCategories.length === 0 && (
               <small className="error">Nenhuma categoria encontrada. Crie uma acima.</small>
            )}           
            {/* MODO 3: Gerenciar (Deletar) Categorias */}
            {isManagingCategories && (
              <div>
                <ul className="categoryList">
                  {filteredCategories.length > 0 ? filteredCategories.map(cat => (
                    <li key={cat.id} className="categoryItem">
                      <span>{cat.nome}</span>
                      <button 
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="deleteCatBtn"
                        disabled={catActionLoading}
                        title="Excluir Categoria"
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </button>
                    </li>
                  )) : (
                    <li className="categoryItem" style={{ color: '#777' }}>Nenhuma categoria.</li>
                  )}
                </ul>
                <div style={{ textAlign: 'right', marginTop: '5px' }}>
                  <span 
                    className="categoryLink" 
                    onClick={() => setIsManagingCategories(false)}
                  >
                    Concluir
                  </span>
                </div>
              </div>
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

function setCatActionLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
