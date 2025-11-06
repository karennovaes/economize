// server.js
const express = require('express');
require('dotenv').config(); // Certifique-se de carregar as variáveis
//const db = require('./config/db'); // Importa a configuração do banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON vindo do body das requisições
app.use(express.json());

// -----------------------------------------------------------------
// TODO: Aqui virão as rotas (authRoutes, transactionRoutes, etc.)
// -----------------------------------------------------------------

app.get('/', (req, res) => {
    res.send('Servidor Economize rodando!');
});
app.get('/usuarios', (req, res) => {
    res.send('Get Usuários');
});
app.post('/usuarios', (req, res) => {
    res.send('Foi o post');
});

// 4. Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    // Teste a conexão logo após iniciar o servidor (o listener do pool já faz isso, mas é bom ter certeza)
    //db.query('SELECT 1')
      //.catch(e => console.error("Erro na verificação inicial do DB:", e.stack));
});