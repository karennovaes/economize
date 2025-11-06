# 🧩 Especificação de Casos de Uso (CU)

| ID do CU | Caso de Uso | Ator Principal | Objetivo | Relacionado ao RF |
| :------- | :----: | ----------: | ----------: | ----------: |
| CU00      | Cadastrar Novo Usuário      |   Usuário |  Criar uma nova conta no sistema para acesso pessoal. | RF010 | 
| CU00.1      | Realizar Login      |   Usuário |  Obter acesso às suas informações financeiras registradas. | RF010.1 | 
| CU01      | Registrar Nova Transação      |   Usuário |  Inserir um novo registro de Receita ou Despesa no sistema. | RF01, RF02 | 
| CU02      | Listar Transações      |   Usuário |  Revisar o histórico detalhado das transações registradas. | RF03 | 
| CU03      | Modificar/Remover Transação     |   Usuário |  Alterar detalhes ou apagar um registro de transação existente. | RF04 | 
| CU04      | Gerenciar Categorias     |   Usuário |  Criar, renomear ou excluir categorias de classificação financeira. | RF05 | 
| CU05      | Gerar Relatório Gráfico de Despesas     |   Usuário |  Visualizar a distribuição percentual dos gastos do mês atual. | RF06 | 

#### Detalhamento do Caso de Uso: CU00 – Cadastrar Novo Usuário

D: CU00 
Nome: Cadastrar Novo Usuário 
Ator: Usuário 
Prioridade: Alta 
Pré-condição: O Usuário não possui uma conta e está na tela de Cadastro

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário informa seu Nome, E-mail e define uma Senha e a Confirmação de Senha. | N/A | 
| 2. | O Usuário clica no botão "Cadastrar" | N/A | 
| 3. |O sistema valida se os campos obrigatórios estão preenchidos e se a Senha e a Confirmação de Senha são idênticas. |A3.1 (Senhas Diferentes): Exibe "A senha e a confirmação não coincidem." e retorna ao Passo 1. | 
| 4. |O sistema verifica se o E-mail já existe na base de dados. | A4.1 (E-mail Duplicado): Exibe "Este e-mail já está cadastrado." e retorna ao Passo 1. | 
| 5. | O sistema armazena o novo Usuário (incluindo o hash da senha). | A5.1 (Erro de Persistência): Exibe "Erro ao criar conta. Tente novamente." | 
| 6. | O sistema redireciona o Usuário para a tela de Login (ou efetua o login automaticamente). O fluxo termina. | N/A | 

#### Detalhamento do Caso de Uso: CU00.1 – Realizar Login

ID: CU00.1
Nome: Realizar Login
Ator: Usuário 
Prioridade: Alta 
Pré-condição: O Usuário possui uma conta e está na tela de Login

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário informa o E-mail e a Senha de sua conta. | N/A | 
| 2. | O Usuário clica no botão "Entrar". | N/A | 
| 3. |O sistema verifica se o E-mail está cadastrado. |A3.1 (Usuário Inexistente): Exibe "E-mail ou senha inválidos." e retorna ao Passo 1. | 
| 4. |O sistema compara a senha fornecida com o hash da senha armazenada. | A4.1 (Senha Incorreta): Exibe "E-mail ou senha inválidos." e retorna ao Passo 1. | 
| 5. | O sistema cria e armazena o token/sessão de autenticação do Usuário. | A5.1 (Erro de Sessão): Exibe "Erro ao iniciar sessão. Tente novamente." | 
| 6. | O sistema redireciona o Usuário para a Tela Principal (Dashboard). O fluxo termina.  | N/A | 



#### Detalhamento do Caso de Uso: CU01 – Registrar Nova Transação

ID: CU01 
Nome: Registrar Nova Transação 
Ator: Usuário 
Prioridade: Alta 
Pré-condição: O Usuário está logado 

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário navega para a tela/formulário de "Nova Transação". | N/A | 
| 2. | O Usuário insere o Valor da transação (deve ser um número positivo). | A2.1 (Valor Inválido): O sistema exibe uma mensagem de erro: "O valor deve ser um número positivo." e retorna ao Passo 2. | 
| 3. | O Usuário seleciona o Tipo da transação (Receita ou Despesa). | N/A | 
| 4. | O Usuário insere a Descrição da transação (texto livre). | A4.1 (Descrição Vazia): Se o campo for obrigatório e vazio, exibe erro e retorna ao Passo 4. | 
| 5. | O Usuário seleciona a Categoria da lista disponível (RF06). | A5.1 (Categoria Não Definida): Se for obrigatório e não selecionado, exibe erro e retorna ao Passo 5 | 
| 6. | O Usuário confirma a data (padrão para a data atual). | N/A | 
| 7. | O Usuário clica no botão "Salvar". | N/A | 
| 8. | O sistema registra a transação no banco de dados/armazenamento. | A8.1 (Erro de Persistência): O sistema exibe: "Erro ao salvar. Tente novamente mais tarde." e o fluxo termina. | 
| 9. | O sistema exibe uma mensagem de sucesso ("Transação salva com sucesso!") e atualiza a tela principal (CU02 e CU03). O fluxo termina. | N/A | 


#### Detalhamento do Caso de Uso: CU02 – Visualizar Saldo Atual

ID: CU02 
Nome: Visualizar Saldo Atual 
Ator: Usuário 
Prioridade: Alta 
Pré-condição: Existem transações registradas no sistema (ou o saldo inicial é 0) 

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário acessa a Tela Principal (Dashboard). | N/A | 
| 2. | O sistema lê todos os registros de Receita e Despesa persistidos. | A2.1 (Nenhum Dado): Se não houver dados, o sistema exibe o Saldo Inicial de 0,00 |
| 3. | O sistema calcula o Saldo Total: $\text{Saldo} = \sum \text{Receitas} - \sum \text{Despesas}$. | N/A |
| 4. | O sistema exibe o valor do Saldo Total em destaque na tela principal. | N/A |
| 5. | O fluxo termina (ou se repete continuamente enquanto a tela estiver aberta). | N/A |












