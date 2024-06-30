const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'codigo')));

// API endpoint para servir JSON
app.get('/api/json', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'codigo/assets/javascript/Json/login.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo JSON');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Definindo a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
