const express = require('express');
const router = express.Router();

const pecaController = require('../controllers/pecaController');
const auth = require('../middlewares/auth');

//Mostrar
router.get('/', auth, pecaController.index);

//Formulário Criar
router.get('/nova', auth, pecaController.create);

//Salvar
router.post('/', auth, pecaController.store);

//Formulário Editar
router.get('/editar/:id', auth, pecaController.edit);

//Atualizar
router.post('/update/:id', auth, pecaController.update);

//Excluir
router.get('/delete/:id', auth, pecaController.delete);

module.exports = router;