// src/config/db.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect(); 
    console.log('✅ Conectado ao Banco de Dados MongoDB via Prisma!');
  } catch (error) {
    console.error('❌ Erro de conexão do Prisma:', error.message);
  }
}
connectDB();
module.exports = prisma;