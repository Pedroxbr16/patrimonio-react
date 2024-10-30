const express = require('express');
const Bem = require('../models/Bem'); // Ajuste o caminho conforme necessário
const router = express.Router();

// Rota para cadastrar um novo bem
router.post('/', async (req, res) => {
  try {
    const novoBem = new Bem(req.body);
    const bemSalvo = await novoBem.save();
    res.status(201).json(bemSalvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar bem', error });
  }
});

// Rota para listar todos os bens
router.get('/', async (req, res) => {
  try {
    const bens = await Bem.find();
    res.json(bens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar bens', error });
  }
});

// Rota para obter um bem específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const bem = await Bem.findById(req.params.id);
    if (!bem) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json(bem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter bem', error });
  }
});

// Rota para atualizar um bem pelo ID
router.put('/:id', async (req, res) => {
  try {
    const bemAtualizado = await Bem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bemAtualizado) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json(bemAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar bem', error });
  }
});

// Rota para deletar um bem pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const bemDeletado = await Bem.findByIdAndDelete(req.params.id);
    if (!bemDeletado) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json({ message: 'Bem deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar bem', error });
  }
});

module.exports = router;
