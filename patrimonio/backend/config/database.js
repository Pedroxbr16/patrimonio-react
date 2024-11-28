const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carregar as variáveis do .env

// URL de conexão com o MongoDB
const uri = process.env.MONGO_URI; // Defina no arquivo .env a variável MONGO_URI com a string de conexão

// Nome do banco de dados
const dbName = process.env.DB_NAME; // Defina o nome do banco de dados no .env

let client;
let db;

// Função para conectar ao MongoDB
async function connectToDatabase() {
  if (db) {
    console.log('Já conectado ao MongoDB.');
    return db; // Retorna a conexão existente se já estiver conectada
  }

  try {
    // Criar um novo cliente do MongoDB
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(); // Conectar ao servidor MongoDB

    console.log('Conectado ao MongoDB!');
    db = client.db(dbName); // Selecionar o banco de dados
    return db;
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
}

// Função para fechar a conexão (opcional)
async function closeConnection() {
  if (client) {
    await client.close();
    console.log('Conexão com o MongoDB encerrada.');
  }
}

module.exports = { connectToDatabase, closeConnection };
