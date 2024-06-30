const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Iniciar o json-server em segundo plano
const jsonServer = spawn('npm', ['run', 'server'], { stdio: 'inherit', shell: true });

// Middleware para servir arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'codigo/assets')));
app.use(express.static(path.join(__dirname, 'codigo/html')));

// Middleware para fazer proxy das requisições para o json-server
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'codigo/html/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on('SIGINT', () => {
  jsonServer.kill();
  process.exit();
});
