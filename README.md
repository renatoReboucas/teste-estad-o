# Teste de Desenvolvimento Web

## Objetivo do teste
Este teste avaliará as habilidades do candidato em desenvolvimento web, integração de tecnologias e o conhecimento em todas as tecnologias mencionadas.

## Tarefa
Desenvolvimento de um sistema que possibilite gerenciar e listar notícias.

## Requisitos obrigatórios

### 1. Frontend
#### a. Feed de notícias
- Exibir uma listagem que contenha (título, url e data)
- Ao clicar em uma notícia na lista, mostrar o conteúdo completo da matéria em uma nova página
- Novas notícias devem ser espelhadas na listagem

#### b. Tela de administração de notícias
- Mostrar listagem de notícias criadas ou atualizadas
- Ao deletar uma matéria remover o item da listagem
- Mostrar a última data de atualização
- Contendo na listagem título e url da matéria

#### c. Observações Frontend
- A tela de listagem e a de administração de notícias deverão ser distintas
- Desenvolva uma interface visando um código limpo e com uma padronização de cores e layout contendo responsividade
- A tecnologia aplicada pode conter de preferência React.js ou Next.js

### 2. Backend
#### a. API RESTful
- Implemente rotas para manipular operações CRUD (Create, Read, Update, Delete) para as notícias
- Estabeleça a comunicação entre o frontend e o backend através de requisições HTTP, permitindo a exibição das notícias presentes no banco de dados

O desenvolvimento deverá ter como objetivo um código limpo, e a tecnologia aplicada pode conter de preferência Node.js ou frameworks como: Express.js ou Nest.js

### 3. Banco de Dados
- Configure um banco de dados (por exemplo, PostgreSQL, MongoDB ou MySQL) para armazenar as notícias
- Conectar o servidor backend ao banco de dados para realizar operações de persistência
- Utilizar o arquivo noticias.json para realizar a alimentação inicial da base de dados com as informações contidas no arquivo
- Utilizar configurações de estrutura de dados para facilitar o first input como por exemplo Migrations e Seeders

O banco de dados poderá ter qualquer ORM, como Prisma, Typeorm, Sequelize, contanto que seja informado o motivo da escolha.

## Requisitos opcionais

### Estado e Gerenciamento
- Implemente o gerenciamento de estado usando o Context API ou Redux para armazenar e atualizar as notícias exibidas na aplicação

### Design Patterns
- Utilize pelo menos um design pattern (por exemplo, Factory, Observer, MVC) para estruturar e organizar o código do back-end

### Testes
- Escreva testes unitários para pelo menos uma função crítica do back-end ou do front-end

### Dockerização
- Crie um Dockerfile para cada serviço (backend e frontend)
- Configure um arquivo docker-compose para orquestrar a execução dos containers

Os requisitos opcionais não são obrigatórios, porém podem ser considerados como critério de desempate em caso empate de pontuação entre os candidatos.

## Forma de envio do teste
- Para informações adicionais, criar um doc contendo os motivos das tecnologias aplicadas, qual arquitetura foi implementada e demais informações
- O código deverá ser entregue via Github, e a documentação de instrução como deixar do ambiente rodando, deverá ser incluída no README.md do projeto
- Enviar por e-mail o link do repositório e o documento com todas as informações pertinentes