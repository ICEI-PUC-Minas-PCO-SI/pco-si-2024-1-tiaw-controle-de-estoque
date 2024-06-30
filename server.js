const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('codigo/assets/javascript/Json/login.json');
const middlewares = jsonServer.defaults();

// Use os middlewares padrão do json-server
server.use(middlewares);

// Configure o roteador do json-server
server.use('/api', router);  // Adicione um prefixo para os endpoints da API

// Serve arquivos estáticos HTML
server.use(express.static(path.join(__dirname, 'codigo/html')));

// Serve a página inicial (index.html) se não houver outras rotas
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'codigo/html', 'index.html'));
});

// Inicia o servidor na porta especificada ou na porta 3000 por padrão
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running on port', process.env.PORT || 3000);
});
