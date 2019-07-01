# Gerenciamento de laboratórios e exames
> Teste técnico de backend para a Dasa.

Projeto destinado a realizar a manutenção de laboratórios e exames. 
A aplicação pode criar, listar, editar, pesquisar e excluir logicamente um laboratório ou um exame, os exames cadastrados no banco de dados e que contém seu status como "ativo" podem ser associados a um ou mais laboratórios.
Há um campo de pesquisa que ao digitar o nome de um exame, é renderizada uma lista gerada dinâmicamente contendo todos os laboratórios que realizam o exame pesquisado.

## Instruções
> Configuração para Desenvolvimento

Após clonar o repositório, execute no terminal 
```sh
npm install
```
 para baixar as dependências, depois execute 
 ```sh
npm run dev
``` 
 para iniciar o servidor.


## Algumas telas da aplicação

### Tela principal:

![](/public/images/index.png) 

### Tela destinada a pesquisa de laboratórios por nome de exame:

![](/public/images/pesquisar-exame.png) 

### Tela destinada a mostrar informações de um laboratório específico:

![](/public/images/infos-lab.png) 

### Menu de navegação

![](/public/images/menu.png)

## Autoria

Jefferson Inácio de Souza Lima  – jeffersoninacio@hotmail.com

[https://github.com/JeffersonISLima](https://github.com/JeffersonISLima)

## Principais tecnologias utilizadas

1. Node.js
2. Express
3. Handlebars
4. Mongoose
5. MongoDB
6. CSS3
7. Body Parser

