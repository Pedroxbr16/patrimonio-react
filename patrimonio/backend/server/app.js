require('dotenv').config(); // Adicione esta linha no início do arquivo

const express = require('express');
const path = require('path');
const cors = require('cors');
const connection = require('../config/database'); // Conexão com o MySQL
const bemRoutes = require('../routes/BemRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS usando a variável de ambiente
app.use(cors({
  origin: process.env.FRONTEND_URL, // URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rota principal
app.get('/', (req, res) => {
  res.send('API de Patrimônio está rodando!');
});

// Rotas
app.use('/bens', bemRoutes);

// Middleware para erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ message: 'Erro no servidor', error: err });
});

// Iniciar o servidor usando a porta definida no .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
