# Sistema de Curso Online

## Sumário

1. [Instalação](#Instalação)
2. [Documentação](#Documentação)
  2.1 [Camada Model](#Camada-Model)
  2.2 [Camada Controller](#Camada-Controller)
  2.3 [Camada View](#Camada-View)
3. [Tecnologias utilizadas](#Tecnologias-utilizadas)
4. [Autor](#Autor)

## Instalação

:warning É necessário ter o PostgreSQL e o Node.js
instalados na sua máquina.

Primeiro, clone este repositório e acesse-o em seu PC:
```bash
$ git clone https://github.com/luigimoraes/<nomeDoRepositorio>

$ cd <nomeDoRepositorio>
```

Em seguida, instale as dependências com o seu gerenciador
```bash
#NPM
$ npm install

#Yarn
$ yarn install
```

Na raiz do projeto há um arquivo chamado **database.sql**: é
o banco de dados. Acesse o PostgreSQL e importe-o:

:warning Você precisa criar um banco de dados de mesmo nome
antes de importar.
```bash
$ psql -h localhost -U <seu nome de usuario(a)> online-course-system < database.sql
```

Na raiz há também o arquivo **connectDatabase.js**. Ele contém as
configuraçoes de conexão com o banco de dados. Reescreva o arquivo,
inserindo seu *username* e senha.

Tudo pronto. Divirta-se! :smiley

## Documentação

Este sistema é uma plataforma básica de cursos online, em que
há alunos e professores. Por "básico" me refiro ao sistema
CRUD, implementado sobre uma arquitetura MVC. O *database*
PostgreSQL é utilizado para a persistência dos dados, e a *library*
ReactJS é usada para cuidar da dinâmica das páginas. O *framework*
ExpressJS cuida do tráfego de informações entre as camadas.

O banco de dados guarda três tabelas: *Course*, que guarda
dados dos cursos, *Instructor*, guardando dados dos professores,
e *Student*, guardando dados dos alunos. Cada professor e aluno
possuem uma lista de *strings* com os nomes dos cursos: no caso dos alunos,
a lista se chama *currentCourses*, representando os cursos sendo
feitos no momento. No caso dos professores, a lista se chama
*ownedCourses*, representando os cursos criados pelos mesmos. Cada
curso possui um título único, uma descrição e uma coluna *instructorName*
com o nome do(a) criador(a) do curso. Todas as três tabelas possuem um *id*
para facilitar a manipulação dos dados. Para a autenticação, as tabelas
*Instructor* e *Student* têm uma coluna *password*.

### Camada Model

Esta camada foi dividida em duas subcamadas, uma para persistência dos dados
e outra para as regras de negócio.

As três tabelas no PostgreSQL estão representadas aqui por três classes Javascript
de mesmo nome, com os atributos representando as respectivas colunas. Para executar
as *queries* SQL há três classes DAO, que herdam das classes represetativas e possuem
métodos assíncronos para rodar as tais *queries*.

Para a subcamada das regras de negócio, três classes nomeadas *AuthActions*,
*UserActions* e *CourseActions* foram criadas, todas se conectando às classes DAO da
subcamada de persistência.

### Camada Controller

### Camada View

## Tecnologias utilizadas

- [Termux](#https://termux.com)
- [VIm](#https://vim.org)
- [Node.js](#https://nodejs.org)
- [PostgreSQL](#https:/www.postgresql.org)
- [ExpressJS](#https://expressjs.com/pt-br)
- [ReactJS](#https://pt-br.reactjs.org)

## Autor

Feito com muito entusiasmo por Luigi Moraes.
