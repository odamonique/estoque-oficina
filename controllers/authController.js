const { query } = require('../db/database');
const bcrypt = require('bcrypt');

//Tela de login
exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

//Login
exports.login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const users = await query(
      'SELECT * FROM usuarios WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.render('login', { error: 'Usuário não encontrado' });
    }

    const user = users[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.render('login', { error: 'Senha inválida' });
    }

    //Criar sessão
    req.session.user = {
      id: user.id,
      nome: user.nome,
      role: user.role
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Erro no login');
  }
};

//Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};