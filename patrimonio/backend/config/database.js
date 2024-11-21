const mysql = require('mysql2');
require('dotenv').config(); // Carregar as variáveis do .env

// Configuração do banco de dados com .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
  console.log('Conectado ao MySQL!');
});

module.exports = connection;
