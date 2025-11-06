# 📝 Documento de Requisitos do Projeto "Economize"

## 1. Introdução

### 1.1 Objetivo do Documento

Este documento especifica os requisitos funcionais e não funcionais para o desenvolvimento do sistema de gerenciamento financeiro pessoal, nomeado "Economize".

### 1.2 Público-Alvo do SistemaUsuários individuais que desejam registrar, categorizar e acompanhar suas receitas e despesas para melhor controle financeiro.

## 2. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem o que o sistema deve fazer.

| ID | Descrição do Requisito Funcional | Prioridade (Alta/Média/Baixa) |
| :------- | :----: | ----------: |
| RF01       | O sistema deve permitir o registro de novas transações, especificando valor, data, descrição e categoria      | Alta     |
| RF02       | O sistema deve classificar as transações como Receita ou Despesa.AltaRF03O sistema deve calcular e exibir o saldo atual (Total de Receitas - Total de Despesas)      |    Alta         |
| RF03       | O sistema deve exibir uma lista completa e filtrável das transações registradas      |    Alta         |
| RF04       | O sistema deve permitir a edição e exclusão de transações previamente registradas      |    Média         |
| RF05       | O sistema deve permitir o cadastro e gerenciamento de categorias de transações (ex: Alimentação, Transporte, Lazer, Salário)      |    Média         |
| RF06       | O sistema deve gerar um relatório visual (gráfico) da distribuição de Despesas por Categoria no mês atual      |    Média         |
| RF07       | O sistema deve permitir que o usuário defina orçamentos (limites) de gastos mensais por categoria      |    Baixa        |
| RF08       | O sistema deve alertar o usuário quando o gasto em uma categoria estiver próximo (ex: 80%) ou exceder o orçamento definido (RF07)      |    Baixa        |
| RF09       | O sistema deve calcular e exibir o saldo atual (Total de Receitas - Total de Despesas).      |    Alta        |


## 3. Requisitos Não Funcionais (RNF)
Os requisitos não funcionais descrevem como o sistema deve ser (qualidade, desempenho, usabilidade, etc.).

| ID | Tipo de RNF | Descrição do Requisito Não Funcional |
| :------- | :----: | ----------: |
| RNF01      | Usabilidade      |    A interface do usuário (UI) deve ser intuitiva e permitir que o registro de uma transação seja feito em, no máximo, 3 cliques a partir da tela inicial.        |
| RNF02      | Performance      |    O cálculo do saldo (RF09) e a exibição da lista de transações (RF03) para até 1000 registros devem ser concluídos em menos de 1 segundo.        |
| RNF03      | Segurança (Dados)     |    Os dados financeiros do usuário devem ser isolados para cada usuário       |
| RNF04      | Portabilidade     |    O sistema deve ser responsivo, funcionando corretamente em navegadores de desktop e dispositivos móveis (através do design responsivo)       |
| RNF05      | Manutenibilidade     |    O código-fonte deve seguir padrões de codificação estabelecidos (ex: ESLint para JavaScript) e ser bem documentado (comentários em funções críticas)       |

