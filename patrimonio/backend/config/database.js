const mongoose = require('mongoose');

// Conexão com o MongoDB
const mongoURI = 'mongodb://localhost:27017/patrimonio'; // Ajuste a URI conforme necessário

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB!');
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = mongoose;
