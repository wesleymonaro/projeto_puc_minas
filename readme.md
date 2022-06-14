# JJSys
##### Projeto criado como POC do projeto final do curso de arquitetura de sistemas distribuídos da PUC Minas Virtual.

O projeto final será separado em um repositório diferente para cada aplicação, a fim de facilitar o deploy de cada micro-serviço. Para essa demontração, unifiquei todos os projetos em apenas um repositório. As aplicações listadas aqui são:

- ms_dojos - Micro-serviço de gerenciamento geral de informações sobre o Dojo.
- ms_students - Micro-serviço de gerenciamento de alunos.
- ms_teachers - Micro-serviço de gerenciamento de instrutores.
- ms_domains - Micro-serviço que fornece informações gerais de domínio da aplicação.
- ms_messages - Micro-serviço responsável pelo envio de mensagens aos usuários.
- portal_web - Aplicação WEB / PWA

Como helpers das aplicações temos:

- @commons - Tipos e arquivos comuns compartilhado entre todas as aplicações
- @helpers - Funções genérias compartilhadas entre todas as aplicações
- @migrations - Aplicação para gerar a estrutura do banco de dados.

## Funcionalidades

As 3 funcionalidades escolhidas para a apresentação da POC são:

- Login de usuário - Funcionalidade de login validando credenciais no AWS Cognito.
- Lista de alunos - Permite a visualização de uma lista com todos os alunos do Dojo.
- Cadastro de novo aluno - Permite o cadastro de um novo aluno no Dojo.

## Instalação e execução

Necessário Node 14+ para rodar as aplicações. 

Por razões óbvias, as credenciais e demais dados sensíveis da aplicação deverão ser preenchidos manualmente nos arquivos `.development.env`e `.production.env`. Sem essas informações, as aplicações **não funcionarão corretamente**.

Para rodar as aplicações de MS listadas acima, basta rodar os comandos:

```sh
npm install
npm run develop
```

Para rodar a aplicação web:

```sh
npm install
lerna bootstrap
npm run start:main
```
