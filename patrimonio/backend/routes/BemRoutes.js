const express = require('express');
const {
  cadastrarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
} = require('../controllers/bemController'); // Importa os controladores

const router = express.Router();

// Rota para cadastrar um novo bem
router.post('/', cadastrarBem);

// Rota para listar todos os bens
router.get('/', listarBens);

// Rota para obter um bem específico pelo ID
router.get('/:id', obterBemPorId);

// Rota para atualizar um bem pelo ID
router.put('/:id', atualizarBem);

// Rota para deletar um bem pelo ID
router.delete('/:id', deletarBem);

module.exports = router;
