const connection = require('../database'); // Conexão com o MySQL

// Função para criar um novo bem
const criarBem = (bemData, callback) => {
  const sql = `
    INSERT INTO bens (descricao, numeroPatrimonio, setor, contaContabil, numeroSerie, status, usuario, dataAquisicao, valorEntrada, marca, modelo, tipoEquipamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    bemData.descricao,
    bemData.numeroPatrimonio,
    bemData.setor,
    bemData.contaContabil,
    bemData.numeroSerie,
    bemData.status,
    bemData.usuario,
    bemData.dataAquisicao,
    bemData.valorEntrada,
    bemData.marca,         // Novo campo
    bemData.modelo,        // Novo campo
    bemData.tipoEquipamento, // Novo campo
  ];

  connection.query(sql, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Função para listar todos os bens
const listarBens = (callback) => {
  const sql = 'SELECT * FROM bens';
  connection.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Função para obter um bem específico pelo ID
const obterBemPorId = (id, callback) => {
  const sql = 'SELECT * FROM bens WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // Retorna o primeiro resultado ou undefined
  });
};

// Função para atualizar um bem pelo ID
const atualizarBem = (id, bemData, callback) => {
  const sql = `
    UPDATE bens
    SET descricao = ?, numeroPatrimonio = ?, setor = ?, contaContabil = ?, numeroSerie = ?, status = ?, usuario = ?, dataAquisicao = ?, valorEntrada = ?, marca = ?, modelo = ?, tipoEquipamento = ?
    WHERE id = ?
  `;
  const values = [
    bemData.descricao,
    bemData.numeroPatrimonio,
    bemData.setor,
    bemData.contaContabil,
    bemData.numeroSerie,
    bemData.status,
    bemData.usuario,
    bemData.dataAquisicao,
    bemData.valorEntrada,
    bemData.marca,         // Novo campo
    bemData.modelo,        // Novo campo
    bemData.tipoEquipamento, // Novo campo
    id,
  ];

  connection.query(sql, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Função para deletar um bem pelo ID
const deletarBem = (id, callback) => {
  const sql = 'DELETE FROM bens WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  criarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
};
