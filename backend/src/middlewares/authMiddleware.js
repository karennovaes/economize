// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Tenta obter o token do cabeçalho "Authorization: Bearer [token]"
    const authHeader = req.headers.authorization; 
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido ou inválido.' });
    }

    // Extrai o Token (removendo "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verifica e Decodifica o Token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Anexa o ID do usuário (payload) ao objeto Request para uso nos Controllers
        req.usuarioId = decoded.id; 
        
        // Continua para a lógica do Controller
        next(); 

    } catch (error) {
        // Token inválido (ex: expirado, assinatura errada)
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;