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
| CU06      | Visualizar Saldo Atual     |   Usuário |  Visualizar saldo atual na plataforma de acordo com Receita e Despesas. | RF06 | 

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

#### Detalhamento do Caso de Uso: CU02 – Listar Transações

ID: CU02 
Nome: Listar Transações
Ator: Usuário 
Prioridade: Alta 
Pré-condição: Existem transações registradas no sistema.

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário acessa a seção "Histórico" ou a Tela Principal (Dashboard) | N/A | 
| 2. |O sistema carrega a lista de transações, exibindo no mínimo Data, Descrição, Categoria e Valor. | A2.1 (Lista Vazia): Se não houver transações, o sistema exibe a mensagem: "Nenhum registro encontrado." e o fluxo termina. | 
| 3. | (Opcional: Implementação de Filtro) O Usuário pode selecionar um Período (mês/ano) ou Tipo (Receita/Despesa) para filtrar. | 3.1 (Filtro Inválido): Se o filtro gerar um resultado vazio, exibe "Nenhum registro encontrado para os filtros selecionados."| 
| 4. | O sistema exibe a lista filtrada e recalcula o total daquela visualização (opcional). | N/A | 
| 5. |O Usuário pode interagir com um item para Editar ou Excluir (que aciona o CU associado a RF05). O fluxo termina. | N/A | 

#### Detalhamento do Caso de Uso: CU03 – Modificar/Remover Transação

ID: CU03 
Nome: Modificar/Remover Transação
Ator: Usuário 
Prioridade: Média 
Pré-condição: O Usuário está logado e visualizando a lista de transações (CU02)

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: | 
| 1. | O Usuário clica no ícone de "Editar" ao lado de uma transação na lista. | O Usuário clica no ícone de "Excluir" ao lado de uma transação na lista. | 
| 2. | O sistema abre o formulário de transação (similar ao CU01), pré-preenchido com os dados da transação selecionada. | A2.1: A transação selecionada não existe mais (concorrência). Exibe erro e retorna à lista (CU02). | 
| 3. | O Usuário altera os campos desejados (Valor, Categoria, etc.). | O sistema solicita uma confirmação explícita: "Tem certeza que deseja excluir esta transação?" | 
| 4. | O Usuário clica em "Salvar Alterações". | A4.1 (Confirmação de Exclusão): Se o Usuário cancelar, o fluxo retorna ao Passo 1 (sem salvar). | 
| 5. | O sistema atualiza a transação no armazenamento e recalcula o saldo (CU06). | A5.1 (Erro de Persistência): Exibe erro de salvamento/exclusão. | 
| 6. | O sistema exibe sucesso e retorna à lista de transações (CU02). O fluxo termina. | O sistema exibe sucesso e retorna à lista de transações (CU02). O fluxo termina. | 

#### Detalhamento do Caso de Uso: CU04 – Gerenciar Categorias

ID: CU04
Nome: Gerenciar Categorias
Ator: Usuário 
Prioridade: Média 
Pré-condição: O Usuário está logado e acessa a tela de "Configurações de Categorias"

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: |
| 1. | O Usuário acessa a tela de gerenciamento. O sistema exibe a lista de categorias existentes (incluindo as padrão: Alimentação, Transporte, etc.) | O Usuário localiza uma categoria que deseja remover.| 
| 2. | O Usuário digita o Nome da nova categoria. | O Usuário clica em "Excluir" para a categoria desejada. | 
| 3. | O Usuário clica em "Adicionar". | O sistema verifica se a categoria está sendo usada por alguma transação. | 
| 4. | O sistema valida se o nome não está vazio e se não é duplicado. | A4.1 (Categoria em Uso): Se a categoria estiver em uso, o sistema exibe um aviso: "Esta categoria está em uso. Mova as transações antes de excluir." e o fluxo termina. | 
| 5. | O sistema salva a nova categoria, disponível para uso em CU01. | A4.2 (Categoria Limpa): O sistema solicita confirmação, remove a categoria e atualiza a lista. | 
| 6. | O sistema exibe uma notificação de sucesso. O fluxo termina. | O sistema exibe notificação de sucesso. O fluxo termina. | 
 
 #### Detalhamento do Caso de Uso: CU05 – Gerar Relatório Gráfico de Despesas

ID: CU04
Nome: Gerar Relatório Gráfico de Despesas
Ator: Usuário 
Prioridade: Média 
Pré-condição: O Usuário está logado e existem Despesas registradas no mês atual.

| Passo | Fluxo Principal (Sucesso) | Fluxo Alternativo (Falha/Exceção) | 
| :------- | :----: | ----------: |
| 1. | O Usuário navega para a aba/seção "Relatórios" ou visualiza o componente no Dashboard. | N/A| 
| 2. | O sistema identifica o Mês e Ano atual (referência para o filtro). | A2.1 (Sem Despesas no Mês): Se não houver despesas no mês, o sistema exibe: "Nenhuma despesa registrada neste mês para gerar o gráfico." e o fluxo termina. 
| 3. | O sistema agrega todas as Despesas do mês atual, agrupando-as pela Categoria | N/A| 
| 4. | O sistema calcula o total gasto por Categoria e o total geral de despesas do mês. | N/A| 
| 5. | O sistema calcula a porcentagem de cada categoria sobre o total de despesas: $\text{Percentual} = \left( \frac{\text{Total da Categoria}}{\text{Total de Despesas do Mês}} \right) \times 100$  | N/A| 
| 6. | O sistema renderiza um Gráfico de Pizza/Rosca (ou barras) mostrando as categorias e suas respectivas porcentagens. | N/A| 
| 7. | O sistema exibe o gráfico e uma tabela de apoio com os valores exatos. O fluxo termina. | N/A| 

 

#### Detalhamento do Caso de Uso: CU06 – Visualizar Saldo Atual

ID: CU06 
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












