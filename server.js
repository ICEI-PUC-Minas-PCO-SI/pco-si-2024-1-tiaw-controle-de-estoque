const jsonServer = require('json-server');
const express = require('express');  // Adicione esta linha para importar o módulo express
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('codigo/assets/javascript/Json/login.json');
const middlewares = jsonServer.defaults();

// Use os middlewares padrão do json-server
server.use(middlewares);

// Configure o roteador do json-server
server.use(router);

// Serve arquivos estáticos HTML
server.use(express.static(path.join(__dirname, 'codigo/html')));

// Inicia o servidor na porta especificada ou na porta 3000 por padrão
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running on port', process.env.PORT || 3000);
});
