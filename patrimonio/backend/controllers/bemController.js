const connection = require('../config/database');

// Controlador para cadastrar um novo bem
const cadastrarBem = (req, res) => {
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

  const sql = `
    INSERT INTO bens (descricao, numeroPatrimonio, setor, contaContabil, numeroSerie, status, usuario, dataAquisicao, valorEntrada, marca, modelo, tipoEquipamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
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
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Erro ao cadastrar bem', error: err });
    }
    res.status(201).json({ message: 'Bem cadastrado com sucesso!', bemId: result.insertId });
  });
};

// Controlador para listar todos os bens
const listarBens = (req, res) => {
  const sql = 'SELECT * FROM bens';

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar bens', error: err });
    }
    res.json(results);
  });
};

// Controlador para obter um bem específico pelo ID
const obterBemPorId = (req, res) => {
  const sql = 'SELECT * FROM bens WHERE id = ?';
  const values = [req.params.id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter bem', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }
    res.json(results[0]);
  });
};

// Controlador para atualizar um bem pelo ID
const atualizarBem = (req, res) => {
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

  const sql = `
    UPDATE bens
    SET descricao = ?, numeroPatrimonio = ?, setor = ?, contaContabil = ?, numeroSerie = ?, status = ?, usuario = ?, dataAquisicao = ?, valorEntrada = ?, marca = ?, modelo = ?, tipoEquipamento = ?
    WHERE id = ?
  `;

  const values = [
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
    req.params.id,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Erro ao atualizar bem', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }
    res.json({ message: 'Bem atualizado com sucesso!' });
  });
};

// Controlador para deletar um bem pelo ID
const deletarBem = (req, res) => {
  const sql = 'DELETE FROM bens WHERE id = ?';
  const values = [req.params.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar bem', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bem não encontrado' });
    }
    res.json({ message: 'Bem deletado com sucesso!' });
  });
};

module.exports = {
  cadastrarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
};
