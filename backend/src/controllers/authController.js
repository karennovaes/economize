// src/controllers/authController.js

const prisma = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// A constante para a chave secreta JWT é lida do .env
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------------------------------------------
// 1. Lógica de Cadastro 
// ------------------------------------------------------------------
const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    // 1. Validação de Entrada
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    }

    try {
        // 2. Hashear a Senha 
        const saltRounds = 10;
        const senha_hash = await bcrypt.hash(senha, saltRounds);

        // 3. Criar o Usuário no MongoDB
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha_hash: senha_hash,
                data_cadastro: new Date(),
            },
            // Não retorna o hash da senha na resposta
            select: {
                id: true,
                nome: true,
                email: true,
                data_cadastro: true,
            }
        });

        // 4. Resposta de Sucesso
        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!', 
            user: novoUsuario 
        });

    } catch (error) {
        // 5. Tratamento de Erro (E-mail Duplicado)
        // O código P2002 é o erro do Prisma para violação de UNIQUE constraint
        if (error.code === 'P2002') { 
            return res.status(409).json({ error: 'Este e-mail já está em uso.' });
        }
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao criar o usuário.' });
    }
};

// ------------------------------------------------------------------
// 2. Lógica de Login (RF010 / CU00.1)
// ------------------------------------------------------------------
const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Encontrar o Usuário
        const usuario = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 2. Comparar a Senha (Hash vs. Senha Pura)
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 3. Gerar o JWT (JSON Web Token)
        const payload = {
            id: usuario.id,
            email: usuario.email
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Resposta de Sucesso com o Token
        res.status(200).json({
            message: 'Login realizado com sucesso.',
            token: token,
            user: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    register,
    login,
};