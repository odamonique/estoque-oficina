function isGerente(req, res, next) {

  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.cargo !== 'gerente') {
    return res.send('Acesso negado');
  }

  next();
}

module.exports = isGerente;