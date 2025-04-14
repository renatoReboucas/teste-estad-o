# Teste de Desenvolvimento Web

## Sistema desenvolvido para gerenciar notícias

O projeto foi construído utilizando NestJS (Node.js com TypeScript), PostgreSQL como banco de dados, Prisma ORM para gerenciamento de dados e Docker para facilitar a configuração do ambiente.

## Endpoints Principais

### 1. Listar Notícias

- **GET /news**
- **Função**: Retorna lista paginada de notícias ordenadas por data (mais recentes primeiro)
- **Parâmetros**: `limit` (padrão: 10), `page` (padrão: 1)
- **Resposta**: Lista de notícias, total, número de páginas, página atual

### 2. Filtrar Notícias por Editoria

- **GET /news/editoria/:editoria**
- **Função**: Retorna notícias filtradas por categoria/editoria
- **Parâmetros**: `editoria` na URL, `limit` e `page` na query
- **Resposta**: Lista de notícias da editoria especificada

### 3. Criar Notícia

- **POST /news**
- **Função**: Adiciona uma nova notícia ao sistema
- **Corpo da Requisição**: Objeto JSON com os dados da notícia (editoria, título, subtítulo, etc.)
- **Resposta**: Objeto da notícia criada com seu ID gerado

### 4. Atualizar Notícia

- **PUT /news/:id**
- **Função**: Atualiza os dados de uma notícia existente
- **Parâmetros**: `id` na URL
- **Corpo da Requisição**: Objeto JSON com os campos a serem atualizados
- **Resposta**: Objeto da notícia atualizada

## Tecnologias Utilizadas

- NestJS: Framework para construção de APIs escaláveis e eficientes.
- TypeScript: Linguagem principal do projeto.
- Prisma ORM: ORM para gerenciamento do banco de dados.
- PostgreSQL: Banco de dados relacional.
- Docker: Ferramenta para facilitar a configuração do ambiente.
- Swagger: Documentação da API.
- Jest: Framework para testes unitários e integrados.

## Como Rodar o Projeto

### Pré-requisitos

- **Docker** e **Docker Compose** instalados.
- **Node.js** (opcional, caso queira rodar localmente sem Docker).

### Passo a Passo

1. **Clone o repositório**

   Clone este repositório em sua máquina local:

   ```bash
   git clone <URL_do_repositório>
   cd <diretório_do_repositório>
   ```

2. **Configuração das variáveis de ambiente**

   Crie um arquivo .env a partir do .env.example na raiz do projeto:

   ```bash
   cp .env.example .env
   ```

3. **Subir os containers com Docker Compose**
   Execute o comando abaixo para construir as imagens e iniciar os containers:

   ```bash
   docker-compose up --build -d
   ```

Isso irá:

- Criar o banco de dados PostgreSQL.

- Aplicar as migrações do Prisma.

- Executar o seed do banco de dados.

- Iniciar a aplicação NestJS.

## Acessando a API

Após o Docker Compose iniciar os serviços, você pode acessar a documentação da API no Swagger:

- **Swagger UI: http://localhost:3000/api**

Aqui você pode explorar e testar todas as rotas disponíveis.

## Testes

O projeto inclui testes unitários e de integração para garantir a qualidade do código. Para rodar os testes, execute:

```bash
yarn test
```
