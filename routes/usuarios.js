const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

const auth = require('../middlewares/auth');
const isGerente = require('../middlewares/isGerente');

//Rotas (todas protegidas)
router.get('/', auth, isGerente, usuarioController.index);

router.get('/novo', auth, isGerente, usuarioController.create);

router.post('/', auth, isGerente, usuarioController.store);

router.get('/editar/:id', auth, isGerente, usuarioController.edit);

router.post('/update/:id', auth, isGerente, usuarioController.update);

router.get('/delete/:id', auth, isGerente, usuarioController.delete);

module.exports = router;