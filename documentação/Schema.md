# 📊 Modelagem de Dados (Schema)

Usarei uma notação simplificada, indicando o Nome do Campo, o Tipo de Dado e se é uma Chave ou se é Obrigatório (*).

### 1. Entidade: Usuário (```Usuario```)

Esta entidade armazena as informações de acesso.

| Campo | Tipo de dado | Obrigatório (*) | Descrição | 
| :------- | :----: | ----------: | :----------: |
| ```id_usuario```      | String/UUID      | * | Chave primária única para o usuário. |
| ```nome```      | String      | * | Nome de exibição do usuário. |
| ```email```      | String      | * | E-mail usado para login (deve ser único) |
| ```senha_hash```      | String      | * | Senha criptografada (hash + salt). |
| ```data_cadastro```      | Timestamp      | * | Data e hora da criação da conta. |

### 2. Entidade: Categoria (```Categoria```)

Esta entidade armazena os tipos de transação. É importante notar que, para manter o isolamento de dados (RNF03.1), cada categoria pertence a um usuário.

| Campo | Tipo de dado | Obrigatório (*) | Descrição | 
| :------- | :----: | ----------: | :----------: |
| ```id_categoria```      | String/UUID      | * | Chave primária única para a categoria. |
| ```id_usuario```      | String/UUID      | * | Chave estrangeira para a tabela ```Usuario``` |
| ```nome```      | String      | * | Ex: "Alimentação", "Lazer", "Salário". |
| ```tipo```      | Enum (Receita ou Despesa)      | * | Define se a categoria se aplica a entradas ou saídas. |
| ```padrao```      | Booleano      | * | e for true, é uma categoria padrão do sistema (não deve ser excluída pelo usuário). |

### 3. Entidade: Transação (``Transacao``)

Esta é a tabela central, registrando cada movimento financeiro.

| Campo | Tipo de dado | Obrigatório (*) | Descrição | 
| :------- | :----: | ----------: | :----------: |
| ```id_transacao```      | String/UUID      | * | Chave primária única para a transação. |
| ```id_categoria```      | String/UUID      | * | Chave estrangeira para a tabela Categoria. |
| ```id_usuario```      | String/UUID      | * | Chave estrangeira para a tabela Usuario. Garante isolamento. |
| ```valor```      | Decimal ou Float      | * | O valor monetário da transação. |
| ```descricao```      | String      |  | Campo de texto livre |
| ```data```      | Date/Timestamp   | * | Data em que a transação ocorreu. |
| ```tipo```      | Enum (Receita ou Despesa)  | * | Armazenamento redundante para facilitar consultas rápidas (pode ser inferido da categoria, mas é útil). |




