const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco
const dbPath = path.join(__dirname, 'database.sqlite');

// Criar conexão
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao SQLite');
    db.run("PRAGMA foreign_keys = ON;")
  }
});

db.serialize(() => {
  // Usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      cargo TEXT NOT NULL CHECK(cargo IN ('gerente', 'funcionario'))
    )
  `);

  // Fornecedores
  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      razao_social TEXT,
      nome_fantasia TEXT,
      cnpj TEXT NOT NULL UNIQUE,
      endereco TEXT,
      telefone TEXT,
      email TEXT,
      nome_contato TEXT,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Peças
  db.run(`
    CREATE TABLE IF NOT EXISTS pecas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      marca TEXT,
      categoria TEXT,
      quantidade INTEGER DEFAULT 0,
      quantidade_minima INTEGER DEFAULT 0,
      preco_custo REAL,
      preco_venda REAL,
      fornecedor_id INTEGER,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
    )
  `);
});

// SELECT
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// INSERT / UPDATE / DELETE
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({id: this.lastID, changes: this.changes});
    });
  });
}

module.exports = { db, query, run };