# NLW Pocket - Javascript/Node - Iniciante

- JavaScript
- Node.js

## Node

- Node => JS Runtime Environment
- Ambiente de execução de JS
- não é framework

**Para que Serve**
Backend, Front End, Micro Serviços, API (WebAPP, Mobile, Desktop)
Script e Automação
Machine Learning
IA

**O que preciso saber para usar o Node?**

- Fundamento de JS
- Callbacks/Promises, Arrow Functions
- API's, HTTP, JSON

## Controle de Versão

- Git / Github

# Aula

## Linguagem

- Declaração de variáveis (const, let)
  - Variáveis Locais e Globais
- Operadores (atribuição, concatenação, matemáticos, lógicos)
- Tipos de Dados (string, number, boolean)
- Estrutura de Dados (function, object, array)
- Controle de Fluxo (if / else)
- Estruturas de Repetição (for, while)
- Javascript entende tudo como um objeto

## Fases da resolução de um problema

- Coletar os dados
- Processar os dados (manipular, alterar, ....)
- Apresentar os dados

## inquirer (node)

- instalando pacote do inriquer no node
- no terminal

`npm install inquirer`

## importando módulo do node

**inserindo no código**

`const { select } = require('@inquirer/prompts')`

- o 'require' vai devolver um objeto
- de dentro do objeto devolvido, eu quero apenas o select

- Biblioteca 'inquirer' -
- 'prompts' - coletar informações do usuários

_async / await_

_HOF - Higher Order Functions_

- toda HOF recebe como atributo uma outra função
- filter, map

_spread operator_
[...metas]
