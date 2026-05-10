const { query, run } = require('../db/database');
const bcrypt = require('bcrypt');

//Mostrar usuários
exports.index = async (req, res) => {

  try {

    const usuarios = await query(
      'SELECT id, nome, username, cargo FROM usuarios ORDER BY id DESC'
    );

    res.render('usuarios/index', { usuarios });

  } catch (err) {
    console.error(err);
    res.send('Erro ao listar usuários');
  }
};

//Formulário criação
exports.create = (req, res) => {
  res.render('usuarios/create');
};

//Salvar usuário
exports.store = async (req, res) => {

  const {
    nome,
    username,
    senha,
    cargo
  } = req.body;

  try {

    //Verificar username duplicado
    const existe = await query(
      'SELECT * FROM usuarios WHERE username = ?',
      [username]
    );

    if (existe.length > 0) {
      return res.send('Usuário já existe');
    }

    //Hash senha
    const senhaHash = await bcrypt.hash(senha, 10);

    await run(`
      INSERT INTO usuarios (
        nome,
        username,
        senha,
        cargo
      )
      VALUES (?, ?, ?, ?)
    `, [
      nome,
      username,
      senhaHash,
      cargo
    ]);

    res.redirect('/usuarios');

  } catch (err) {
    console.error(err);
    res.send('Erro ao cadastrar usuário');
  }
};

//Form edição
exports.edit = async (req, res) => {

  const { id } = req.params;

  try {

    const usuarios = await query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );

    if (usuarios.length === 0) {
      return res.send('Usuário não encontrado');
    }

    res.render('usuarios/edit', {
      usuario: usuarios[0]
    });

  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar usuário');
  }
};

//Atualizar usuário
exports.update = async (req, res) => {

  const { id } = req.params;

  const {
    nome,
    username,
    senha,
    cargo
  } = req.body;

  try {

    //Atualização sem alterar senha
    if (!senha || senha.trim() === '') {

      await run(`
        UPDATE usuarios
        SET
          nome = ?,
          username = ?,
          cargo = ?
        WHERE id = ?
      `, [
        nome,
        username,
        cargo,
        id
      ]);

    } else {

      //Atualizar com nova senha
      const senhaHash = await bcrypt.hash(senha, 10);

      await run(`
        UPDATE usuarios
        SET
          nome = ?,
          username = ?,
          senha = ?,
          cargo = ?
        WHERE id = ?
      `, [
        nome,
        username,
        senhaHash,
        cargo,
        id
      ]);
    }

    res.redirect('/usuarios');

  } catch (err) {
    console.error(err);
    res.send('Erro ao atualizar usuário');
  }
};

//Excluir usuário
exports.delete = async (req, res) => {

  const { id } = req.params;

  try {

    //Evitar excluir a si mesmo
    if (parseInt(id) === req.session.user.id) {
      return res.send('Você não pode excluir seu próprio usuário');
    }

    await run(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );

    res.redirect('/usuarios');

  } catch (err) {
    console.error(err);
    res.send('Erro ao excluir usuário');
  }
};