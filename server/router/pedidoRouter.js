const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.listarPedidos);
router.get('/cliente/:cliente', pedidoController.retornarPedidosPorCliente);
router.get('/produtos/:pedido', pedidoController.retornarProdutosDoPedido);
router.post('/', pedidoController.salvar);
router.post('/item/:codigo', pedidoController.adicionarItemAoPedido);
router.get('/:codigo', pedidoController.buscarPorId);
router.put('/:codigo', pedidoController.atualizar);
router.delete('/:codigo', pedidoController.excluir);



module.exports = router;
