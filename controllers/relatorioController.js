const { query } = require('../db/database');

//Relatório geral
exports.index = async (req, res) => {

  try {

    const pecas = await query(`
      SELECT *
      FROM pecas
      ORDER BY nome
    `);

    res.render('relatorios/index', {pecas});

  } catch (err) {
    console.error(err);
    res.send('Erro relatório');
  }
};

//Estoque baixo
exports.estoqueBaixo = async (req, res) => {

  try {

    const pecas = await query(`
      SELECT *
      FROM pecas
      WHERE quantidade <= quantidade_minima
      ORDER BY quantidade ASC
    `);

    res.render('relatorios/estoqueBaixo', {pecas});

  } catch (err) {
    console.error(err);
    res.send('Erro relatório');
  }
};