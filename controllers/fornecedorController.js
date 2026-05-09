const { query, run } = require('../db/database');

//Mostrar fornecedores
exports.index = async (req, res) => {
  try {
    const fornecedores = await query(
      'SELECT * FROM fornecedores ORDER BY id DESC'
    );

    res.render('fornecedores/index', { fornecedores });
  } catch (err) {
    console.error(err);
    res.status.send('Erro ao listar fornecedores');
  }
};

//Formulário de criação
exports.create = (req, res) => {
  res.render('fornecedores/create');
};

//Salvar fornecedor
exports.store = async (req, res) => {
  const {
    razao_social,
    nome_fantasia,
    cnpj,
    endereco,
    telefone,
    email,
    nome_contato
  } = req.body;

  try {
    await run(
      `
      INSERT INTO fornecedores
      (
        razao_social,
        nome_fantasia,
        cnpj,
        endereco,
        telefone,
        email,
        nome_contato
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        razao_social,
        nome_fantasia,
        cnpj,
        endereco,
        telefone,
        email,
        nome_contato
      ]
    );

    res.redirect('/fornecedores');
  } catch (err) {
    console.error(err);
    res.send('Erro ao cadastrar fornecedor');
  }
};

//Formulário de edição
exports.edit = async (req, res) => {
  const { id } = req.params;

  try {
    const fornecedores = await query(
      'SELECT * FROM fornecedores WHERE id = ?',
      [id]
    );

    if (fornecedores.length === 0) {
      return res.send('Fornecedor não encontrado');
    }

    res.render('fornecedores/edit', {
      fornecedor: fornecedores[0]
    });
  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar fornecedor');
  }
};

//Atualizar fornecedor
exports.update = async (req, res) => {
  const { id } = req.params;

  const {
    razao_social,
    nome_fantasia,
    cnpj,
    endereco,
    telefone,
    email,
    nome_contato
  } = req.body;

  try {
    await run(
      `
      UPDATE fornecedores
      SET
        razao_social = ?,
        nome_fantasia = ?,
        cnpj = ?,
        endereco = ?,
        telefone = ?,
        email = ?,
        nome_contato = ?
      WHERE id = ?
      `,
      [
        razao_social,
        nome_fantasia,
        cnpj,
        endereco,
        telefone,
        email,
        nome_contato,
        id
      ]
    );

    res.redirect('/fornecedores');
  } catch (err) {
    console.error(err);
    res.send('Erro ao atualizar fornecedor');
  }
};

//Excluir fornecedor
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await run(
      'DELETE FROM fornecedores WHERE id = ?',
      [id]
    );

    res.redirect('/fornecedores');
  } catch (err) {
    console.error(err);
    res.send('Erro ao excluir fornecedor');
  }
};