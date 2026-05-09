const { query, run } = require('../db/database');

//Mostrar peças
exports.index = async (req, res) => {
  try {

    const pecas = await query(`
      SELECT pecas.*, fornecedores.nome_fantasia AS fornecedor_nome
      FROM pecas
      LEFT JOIN fornecedores
        ON pecas.fornecedor_id = fornecedores.id
      ORDER BY pecas.id DESC
    `);

    res.render('pecas/index', { pecas });

  } catch (err) {
    console.error(err);
    res.send('Erro ao listar peças');
  }
};

//Formulário de criação
exports.create = async (req, res) => {
  try {

    const fornecedores = await query(
      'SELECT * FROM fornecedores ORDER BY nome_fantasia'
    );

    res.render('pecas/create', { fornecedores });

  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar formulário');
  }
};

//Salvar peça
exports.store = async (req, res) => {

  const {
    nome,
    descricao,
    marca,
    categoria,
    quantidade,
    quantidade_minima,
    preco_custo,
    preco_venda,
    fornecedor_id
  } = req.body;

  try {

    await run(`
      INSERT INTO pecas (
        nome,
        descricao,
        marca,
        categoria,
        quantidade,
        quantidade_minima,
        preco_custo,
        preco_venda,
        fornecedor_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nome,
      descricao,
      marca,
      categoria,
      quantidade,
      quantidade_minima,
      preco_custo,
      preco_venda,
      fornecedor_id
    ]);

    res.redirect('/pecas');

  } catch (err) {
    console.error(err);
    res.send('Erro ao cadastrar peça');
  }
};

//Formulário edição
exports.edit = async (req, res) => {

  const { id } = req.params;

  try {

    const pecas = await query(
      'SELECT * FROM pecas WHERE id = ?',
      [id]
    );

    const fornecedores = await query(
      'SELECT * FROM fornecedores ORDER BY nome_fantasia'
    );

    if (pecas.length === 0) {
      return res.send('Peça não encontrada');
    }

    res.render('pecas/edit', {
      peca: pecas[0],
      fornecedores
    });

  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar edição');
  }
};

//Atualizar peça
exports.update = async (req, res) => {

  const { id } = req.params;

  const {
    nome,
    descricao,
    marca,
    categoria,
    quantidade,
    quantidade_minima,
    preco_custo,
    preco_venda,
    fornecedor_id
  } = req.body;

  try {

    await run(`
      UPDATE pecas
      SET
        nome = ?,
        descricao = ?,
        marca = ?,
        categoria = ?,
        quantidade = ?,
        quantidade_minima = ?,
        preco_custo = ?,
        preco_venda = ?,
        fornecedor_id = ?,
        data_atualizacao = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      nome,
      descricao,
      marca,
      categoria,
      quantidade,
      quantidade_minima,
      preco_custo,
      preco_venda,
      fornecedor_id,
      id
    ]);

    res.redirect('/pecas');

  } catch (err) {
    console.error(err);
    res.send('Erro ao atualizar peça');
  }
};

//Excluir peça
exports.delete = async (req, res) => {

  const { id } = req.params;

  try {

    await run(
      'DELETE FROM pecas WHERE id = ?', [id]
    );

    res.redirect('/pecas');

  } catch (err) {
    console.error(err);
    res.send('Erro ao excluir peça');
  }
};