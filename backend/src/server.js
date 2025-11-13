// src/server.js
const express = require('express');
require('dotenv').config(); 
const cors = require('cors'); // 1. Importar o cors
require('./config/db'); // Inicializa a conexão Prisma
const authRoutes = require('./routes/authRoutes') // Importação da rota de autenticação
const transactionRoutes = require('./routes/transactionRoutes'); // Importa o arquivo de rotas de transação
const categoryRoutes = require('./routes/categoryRoutes'); // Importa o arquivo de rotas de categorias
const dashboardRoutes = require('./routes/dashboardRoutes'); //Importa o arquivo de rotas de dashboard
const budgetRoutes = require('./routes/budgetRoutes'); //Importa o arquivo de rotas de orçamento

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Definir as opções do CORS
const corsOptions = {
  // Permitir apenas pedidos da origem do seu frontend
  origin: 'http://localhost:3001', 
  optionsSuccessStatus: 200 // Para compatibilidade com browsers antigos
};


// 3. Usar o CORS como um middleware global
app.use(cors(corsOptions)); 
app.use(express.json());


/* -----    ROTAS ------ */

app.get('/', (req, res) => {
    res.send('Servidor Economize (MongoDB) rodando!');
});
// Conecta as rotas de autenticação (já existentes)
app.use('/auth', authRoutes);
// Conecta as rotas de transações no path /transactions (PROTEGIDO)
app.use('/transactions', transactionRoutes);
// Conecta as rotas de categoria
app.use('/categories', categoryRoutes);
// Conecta as rotas de dashboard/relatórios
app.use('/dashboard', dashboardRoutes);
// Conecta as rotas de orçamento
app.use('/budgets', budgetRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});