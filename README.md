# 💰 Projeto Economize: Gerenciamento Financeiro Pessoal✨ 

Visão Geral do ProjetoEconomize é uma aplicação web completa, desenvolvida como projeto de portfólio, destinada a auxiliar usuários no controle e monitoramento de suas finanças pessoais. O objetivo é fornecer uma ferramenta intuitiva para registrar receitas e despesas, categorizar gastos, visualizar o saldo em tempo real e gerenciar orçamentos mensais (budgeting).Este projeto demonstra proficiência em Engenharia de Software (Documentação e Requisitos), Desenvolvimento de API Segura (JWT) e Modelagem de Dados Moderna (Prisma + MongoDB).

## 💻 Stack Tecnológica (Backend)

| Componente | Tecnologia | Justificativa |
| -------- | ----- | ----------- |
| Linguagem | Node.js | Ambiente assíncrono e unificado com JavaScript.     |
| Framework | Express.js |  Rápido e leve para construção de APIs REST. |
| Banco de Dados | MongoDB |  Banco de dados NoSQL para flexibilidade de esquema e escalabilidade. |
| ORM/ODL | Prisma |  Camada de abstração de dados moderna, garantindo consultas seguras e tipadas.|
| Segurança | JWT (JSON Web Tokens) & Bcrypt |  Padrão de autenticação sem estado e hash seguro de senha |
| Ferramentas | dotenv-cli, Nodemon |  Gerenciamento robusto de ambiente e desenvolvimento contínuo. |


## 🏗️ Estrutura da Arquitetura
O projeto segue a arquitetura Cliente-Servidor (API REST), com isolamento claro de responsabilidades:

1. Rotas (/routes): Define os endpoints da API (/auth, /transactions).

2. Middlewares (/middlewares): Camada de interceptação, crucial para o authMiddleware (proteção JWT) e o isolamento de dados por usuário.

3. Controllers (/controllers): Contém a lógica de negócio principal (validação e manipulação de dados).

4. Prisma Client (/config/db.js): Camada de acesso a dados.


## ⚙️ Configuração e Instalação (Backend)

Siga os passos abaixo para configurar e rodar a API localmente.

#### Pré-requisitos
Node.js (v18+)

MongoDB (Instalado localmente ou um cluster MongoDB Atlas ativo)

#### Instruções
1. Clone o Repositório e Navegue para o Backend:

```
git clone [URL_DO_SEU_REPOSITORIO]
cd economize/backend
```
2. Instale as Dependências:
```
npm install
```
3. Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz do diretório backend/ com as seguintes variáveis:
```
DATABASE_URL="mongodb+srv://admin:SUA_SENHA@economizedb.xuqfarz.mongodb.net/economize_db?appName=economizedb"
JWT_SECRET="SEGREDO_MUITO_LONGO_E_ALEATORIO_PARA_JWT"
PORT=3000
```
4. Sincronize o Banco de Dados (Prisma DB Push): Este comando cria as coleções no seu MongoDB com base no schema.prisma e gera o cliente Prisma:
```
npm run db:push
npm run generate
```
5. Inicie o Servidor em Modo Desenvolvimento:
```
npm run dev
```
O servidor estará acessível em http://localhost:3000.

## 🧪 Endpoints da API (Testes com Postman/Insomnia)

Todas as rotas, exceto as de autenticação, exigem o cabeçalho Authorization: Bearer [TOKEN_JWT].

![alt text](image.png)

## 🙋 Contribuições

Este é um projeto pessoal, mas sinta-se à vontade para inspecionar o código e a arquitetura. 

