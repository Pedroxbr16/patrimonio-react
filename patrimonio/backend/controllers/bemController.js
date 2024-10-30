const Bem = require('../models/Bem');

// Controlador para cadastrar um novo bem
const cadastrarBem = async (req, res) => {
  try {
    const novoBem = new Bem(req.body);
    const bemSalvo = await novoBem.save();
    res.status(201).json(bemSalvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar bem', error });
  }
};

// Controlador para listar todos os bens
const listarBens = async (req, res) => {
  try {
    const bens = await Bem.find();
    res.json(bens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar bens', error });
  }
};

// Controlador para obter um bem específico pelo ID
const obterBemPorId = async (req, res) => {
  try {
    const bem = await Bem.findById(req.params.id);
    if (!bem) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json(bem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter bem', error });
  }
};

// Controlador para atualizar um bem pelo ID
const atualizarBem = async (req, res) => {
  try {
    const bemAtualizado = await Bem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bemAtualizado) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json(bemAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar bem', error });
  }
};

// Controlador para deletar um bem pelo ID
const deletarBem = async (req, res) => {
  try {
    const bemDeletado = await Bem.findByIdAndDelete(req.params.id);
    if (!bemDeletado) return res.status(404).json({ message: 'Bem não encontrado' });
    res.json({ message: 'Bem deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar bem', error });
  }
};

module.exports = {
  cadastrarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem
};
