const { query, run } = require('./db/database');
const bcrypt = require('bcrypt');

async function seed() {

  try {

    //Verifica se já existe gerente
    const usuarios = await query(
      'SELECT * FROM usuarios WHERE cargo = ?',
      ['gerente']
    );

    if (usuarios.length > 0) {
      console.log('Já existe um gerente.');
      return;
    }

    //Hash da senha
    const senhaHash = await bcrypt.hash('123', 10);

    //Criar gerente padrão
    await run(`
      INSERT INTO usuarios (
        nome,
        username,
        senha,
        cargo
      )
      VALUES (?, ?, ?, ?)
    `, [
      'Administrador',
      'admin',
      senhaHash,
      'gerente'
    ]);

    console.log('Gerente criado com sucesso!');
    console.log('Usuário: admin');
    console.log('Senha: 123');

  } catch (err) {
    console.error(err);
  }
}

seed();