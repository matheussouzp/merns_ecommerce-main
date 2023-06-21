const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const produtoController = require('../controllers/produtoController');

router.post('/', upload.single('imagem'), produtoController.salvar);
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorId);
router.put('/:codigo', upload.single('imagem'), produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);
router.post('/:codigo/comentarios', produtoController.adicionarComentario);
router.get('/detalhes', produtoController.listarDetalhes);
router.get('/comentarios/:codigo', produtoController.obterComentarios);
router.get('/detalhes/:codigo', produtoController.listarDetalhes);


module.exports = router;
