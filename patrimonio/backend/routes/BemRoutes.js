const express = require('express');
const {
  cadastrarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
} = require('../controllers/bemController');

const router = express.Router();

router.post('/', cadastrarBem);
router.get('/', listarBens);
router.get('/:id', obterBemPorId);
router.put('/:id', atualizarBem);
router.delete('/:id', deletarBem);

module.exports = router;
