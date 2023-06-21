const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.listar);
router.post('/', categoriaController.salvar);
router.get('/:codigo', categoriaController.buscarPorId);
router.put('/:codigo', categoriaController.atualizar);
router.delete('/:codigo', categoriaController.excluir);

module.exports = router;