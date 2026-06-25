# Sistema Academico - Controle de Alunos

Projeto academico desenvolvido por **Guilherme Maciel de Assuncao** para a disciplina de **Programacao Web II**.

O sistema e uma aplicacao web para gerenciamento academico, com cadastro de alunos, cursos, professores, turmas, eventos, ocorrencias e relacionamentos entre alunos e disciplinas/eventos.

## Tecnologias

- Node.js
- NestJS
- TypeScript
- TypeORM
- MySQL
- EJS
- Bootstrap

## Funcionalidades

- Autenticacao com tela de login
- CRUD de alunos
- CRUD de cursos
- CRUD de departamentos
- CRUD de disciplinas
- CRUD de enderecos
- CRUD de eventos
- CRUD de ocorrencias
- CRUD de professores
- CRUD de turmas
- Relacionamento N:N entre aluno e disciplina
- Relacionamento N:N entre aluno e evento
- Layout com menu lateral e painel inicial

## Configuracao

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=controle_alunos
DB_SYNCHRONIZE=false
DB_LOGGING=false

AUTH_USERNAME=admin
AUTH_PASSWORD=troque-esta-senha
AUTH_SECRET=troque-este-segredo
```

O arquivo `.env` nao deve ser enviado para o repositorio, pois pode conter dados sensiveis.

## Banco de dados

O projeto utiliza MySQL. Ha um arquivo SQL chamado `controle_alunos_db.sql` na raiz do projeto para auxiliar na criacao/importacao do banco.

Banco esperado:

```text
controle_alunos
```

## Instalacao

Instale as dependencias:

```bash
npm install
```

## Executando o projeto

Para rodar em modo desenvolvimento:

```bash
npm run start:dev
```

Para rodar normalmente:

```bash
npm run start
```

Depois acesse:

```text
http://localhost:3000
```

## Login

As credenciais de acesso sao definidas no arquivo `.env`:

```env
AUTH_USERNAME=admin
AUTH_PASSWORD=troque-esta-senha
```

## Scripts disponiveis

```bash
npm run build
```

Compila o projeto.

```bash
npm run start
```

Inicia a aplicacao.

```bash
npm run start:dev
```

Inicia a aplicacao em modo desenvolvimento.

## Estrutura principal

```text
src/
  modules/
    aluno/
    aluno-disciplina/
    aluno-evento/
    curso/
    departamento/
    disciplina/
    endereco/
    evento/
    ocorrencia/
    professor/
    turma/
views/
  layouts/
  partials/
  autenticacao/
public/
  css/
```

## Observacao academica

Este projeto foi desenvolvido com finalidade academica, para demonstrar conceitos de aplicacoes web com NestJS, renderizacao server-side com EJS, persistencia com TypeORM e MySQL, autenticacao simples e operacoes CRUD.
