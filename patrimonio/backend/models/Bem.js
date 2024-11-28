const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb'); // Para converter IDs do MongoDB

// Função para criar um novo bem
const criarBem = async (bemData, callback) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').insertOne(bemData); // Insere um novo documento na coleção "bens"
    callback(null, { id: result.insertedId, ...bemData });
  } catch (err) {
    callback(err);
  }
};

// Função para listar todos os bens
const listarBens = async (callback) => {
  try {
    const db = await connectToDatabase();
    const bens = await db.collection('bens').find({}).toArray(); // Retorna todos os documentos da coleção "bens"
    callback(null, bens);
  } catch (err) {
    callback(err);
  }
};

// Função para obter um bem específico pelo ID
const obterBemPorId = async (id, callback) => {
  try {
    const db = await connectToDatabase();
    const bem = await db.collection('bens').findOne({ _id: new ObjectId(id) }); // Busca um documento pelo `_id`
    if (!bem) {
      return callback({ message: 'Bem não encontrado' });
    }
    callback(null, bem);
  } catch (err) {
    callback(err);
  }
};

// Função para atualizar um bem pelo ID
const atualizarBem = async (id, bemData, callback) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').updateOne(
      { _id: new ObjectId(id) }, // Filtro pelo `_id`
      { $set: bemData } // Atualiza apenas os campos especificados
    );

    if (result.matchedCount === 0) {
      return callback({ message: 'Bem não encontrado' });
    }

    callback(null, { id, ...bemData });
  } catch (err) {
    callback(err);
  }
};

// Função para deletar um bem pelo ID
const deletarBem = async (id, callback) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('bens').deleteOne({ _id: new ObjectId(id) }); // Remove o documento pelo `_id`

    if (result.deletedCount === 0) {
      return callback({ message: 'Bem não encontrado' });
    }

    callback(null, { message: 'Bem deletado com sucesso!' });
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  criarBem,
  listarBens,
  obterBemPorId,
  atualizarBem,
  deletarBem,
};
