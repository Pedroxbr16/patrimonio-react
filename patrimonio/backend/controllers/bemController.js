const { connectToDatabase } = require('../config/database');

// Controlador para cadastrar um novo bem
const cadastrarBem = async (req, res) => {
  const {
    descricao,
    numeroPatrimonio,
    setor,
    contaContabil,
    numeroSerie,
    status,
    usuario,
    dataAquisicao,
    valorEntrada,
    marca,
    modelo,
    tipoEquipamento, // Novos campos
  } = req.body;

  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').insertOne({
      descricao,
      numeroPatrimonio,
      setor,
      contaContabil,
      numeroSerie,
      status,
      usuario,
      dataAquisicao,
      valorEntrada,
      marca,
      modelo,
      tipoEquipamento, // Novos campos
    });
    res.status(201).json({ message: 'Bem cadastrado com sucesso!', bemId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar bem', error: err });
  }
};

// Controlador para listar todos os bens
const listarBens = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bens = await db.collection('bens').find({}).toArray();
    res.json(bens);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar bens', error: err });
  }
};

// Controlador para obter um bem específico pelo ID
const obterBemPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToDatabase();
    const bem = await db.collection('bens').findOne({ _id: new require('mongodb').ObjectId(id) });

    if (!bem) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }

    res.json(bem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter bem', error: err });
  }
};

// Controlador para atualizar um bem pelo ID
const atualizarBem = async (req, res) => {
  const {
    descricao,
    numeroPatrimonio,
    setor,
    contaContabil,
    numeroSerie,
    status,
    usuario,
    dataAquisicao,
    valorEntrada,
    marca,
    modelo,
    tipoEquipamento, // Novos campos
  } = req.body;

  const { id } = req.params;

  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      {
        $set: {
          descricao,
          numeroPatrimonio,
          setor,
          contaContabil,
          numeroSerie,
          status,
          usuario,
          dataAquisicao,
          valorEntrada,
          marca,
          modelo,
          tipoEquipamento, // Novos campos
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }

    res.json({ message: 'Bem atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar bem', error: err });
  }
};

// Controlador para deletar um bem pelo ID
const deletarBem = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').deleteOne({ _id: new require('mongodb').ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }

    res.json({ message: 'Bem deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar bem', error: err });
  }
};

module.exports = {
  cadastrarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
};
