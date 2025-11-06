// src/server.js
const express = require('express');
require('dotenv').config(); 
require('./config/db'); // Inicializa a conexão Prisma
const authRoutes = require('./routes/authRoutes') // Importação da rota de autenticação
const transactionRoutes = require('./routes/transactionRoutes'); // Importa o arquivo de rotas de transação

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


/* -----    ROTAS ------ */

app.get('/', (req, res) => {
    res.send('Servidor Economize (MongoDB) rodando!');
});
// Conecta as rotas de autenticação (já existentes)
app.use('/auth', authRoutes);
// Conecta as rotas de transações no path /transactions (PROTEGIDO)
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});