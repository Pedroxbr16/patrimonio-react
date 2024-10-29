
const mongoose = require('mongoose');

const bemSchema = new mongoose.Schema({
  descricao: String,
  numeroPatrimonio: String,
  setor: String,
  contaContabil: String,
  numeroSerie: String,
  status: String, // 'ativo' ou 'inativo'
  usuario: String, // caso seja notebook
  dataAquisicao: Date,
  valorEntrada: Number
});

module.exports = mongoose.model('Bem', bemSchema);
