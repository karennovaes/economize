# 🏗️ Planejamento da Arquitetura do Projeto "Economize"


### 1. Visão Geral da Arquitetura

A arquitetura será dividida em duas camadas principais que se comunicam via *API REST*:

 1. *Frontend (Cliente)*: Responsável pela Interface do Usuário (UI/UX) e lógica de apresentação.
 2. *Backend (Servidor)*: Responsável pela lógica de negócio, persistência de dados e segurança (autenticação).
 
 [Diagrama Conceitual]
 
 $$\text{Frontend (Browser)} \xrightarrow{\text{HTTPS/JSON}} \text{Backend (API REST)} \xrightarrow{\text{SQL/NoSQL}} \text{Banco de Dados}$$

### 2. Escolha das Tecnologias

| Componente | Tecnologia | Justificativa | 
| :------- | :----: | ----------: | 
| Frontend      | React      | Alto padrão de mercado, excelente para criar UIs dinâmicas, ideal para visualizar gráficos |
| Backend      | Node.js com Express      | Linguagem JavaScript unificada com o Frontend, rápido para construir APIs REST |
| Banco de Dados      | PostgreSQL (SQL) ou MongoDB (NoSQL)      | PostgreSQL demonstra melhor compreensão de relacionamentos (Chaves Estrangeiras, essencial para esta modelagem). MongoDB seria mais rápido para um MVP NoSQL |
| Autenticação      | JWT (JSON Web Tokens)      | Padrão para APIs REST, essencial para validar o acesso do usuário|

### 3. Detalhamento da Camada de Backend (API REST)

| Verbo HTTP | Endpoint | Funcionalidade | 
| :------- | :----: | ----------: | 
|POST| /api/auth/register      | Cadastro de Usuário. |
| POST  | /api/auth/login     | Autenticação e emissão de JWT. |
| POST | /api/transactions | Criação de Nova Transação (Requer JWT) |
| GET | /api/transactions |Listagem de todas as transações do usuário logado.|
| PUT/DELETE | /api/transactions/:id |Edição ou Remoção de Transação (Requer JWT e validação de posse).|
| GET | /api/dashboard/balance |Retorna o saldo atual do usuário logado.|
| GET | /api/reports/expenses |Retorna os dados agregados para o gráfico de despesas do mês.|




