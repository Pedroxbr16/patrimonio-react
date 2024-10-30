const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bemRoutes = require('../routes/BemRoutes'); // Ajuste o caminho conforme necessário
const cors = require('cors');

const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/patrimonio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Teste de Rota Principal
app.get('/', (req, res) => {
  res.send('API de Patrimônio está rodando!');
});

// Rotas para bens
app.use('/bens', bemRoutes);

// Rota para lidar com rotas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ message: 'Erro no servidor', error: err });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
