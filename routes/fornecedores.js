const express = require('express');
const router = express.Router();

const fornecedorController = require('../controllers/fornecedorController');
const auth = require('../middlewares/auth');

//Mostrar
router.get('/', auth, fornecedorController.index);

//Criar
router.get('/novo', auth, fornecedorController.create);

//Salvar
router.post('/', auth, fornecedorController.store);

//Editar
router.get('/editar/:id', auth, fornecedorController.edit);

//Atualizar
router.post('/update/:id', auth, fornecedorController.update);

//Excluir
router.get('/delete/:id', auth, fornecedorController.delete);

module.exports = router;