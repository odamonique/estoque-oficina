const { run } = require('./db/database');
const bcrypt = require('bcrypt');

async function criarUsuario() {
  const senhaHash = await bcrypt.hash('123', 10);

  await run(
    `INSERT INTO usuarios (nome, username, senha, cargo)
     VALUES (?, ?, ?, ?)`,
    ['Administrador', 'admin2', senhaHash, 'gerente']
  );

  console.log('Usuário criado!');
}

criarUsuario();