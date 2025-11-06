// src/server.js
const express = require('express');
require('dotenv').config(); 
require('./config/db'); // Inicializa a conexão Prisma
const authRoutes = require('./routes/authRoutes') // Importação da rota de autenticação

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


/* -----    ROTAS ------ */

app.get('/', (req, res) => {
    res.send('Servidor Economize (MongoDB) rodando!');
});
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});