const pedidoModel = require('../models/pedidoModel.js');
const clienteModel = require('../models/clienteModel.js');
const produtoModel = require('../models/produtoModel.js');


class PedidoController {
  async salvar(req, res) {
    try {
        const pedido = req.body;

        const max = await pedidoModel.findOne({}).sort({ codigo: -1 });
        pedido.codigo = max == null ? 1 : max.codigo + 1;

        const cliente = await clienteModel.findOne({ codigo: pedido.cliente });

        pedido.cliente = cliente._id;
        pedido.precototal=0;

        const novoPedido = await pedidoModel.create(pedido);
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o pedido' });
    }
  }

  async listarPedidos(req, res) {
    try {
      const pedidos = await pedidoModel.find({});
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os pedidos' });
    }
  }

  async buscarPorId(req, res) {
    const codigo = req.params.codigo;
    const resultado = await pedidoModel.findOne({ 'codigo': codigo });
    res.status(200).json(resultado);
  }

  async atualizar(req, res) {
    try {
      const codigo = req.params.codigo;
      const pedido = await pedidoModel.findOne({ 'codigo': codigo });

      if (pedido) {
        if (req.file) {
          req.body.foto = req.file.path;
        }

        await pedidoModel.findByIdAndUpdate(pedido._id, req.body);
        res.status(200).send();
      } else {
        res.status(404).json({ error: 'Pedido não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o pedido' });
    }
  }

  async excluir(req, res) {
    const codigo = req.params.codigo;
    const _id = String((await pedidoModel.findOne({ 'codigo': codigo }))._id);
    await pedidoModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }

  async adicionarItemAoPedido(req, res) {
    try {
        const codigopedido = req.params.codigo;
        const { quantidade, produto } = req.body;
        console.log(quantidade);
        console.log(produto);

        // Verificar se o pedido existe
        console.log(codigopedido);

        const pedido = await pedidoModel.findOne({ codigo: codigopedido });


        

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }


        //busca id produto correto

        const produtoidreal = await produtoModel.findOne({ codigo: produto });
        pedido.produto = produtoidreal._id;
        console.log(pedido.produto);

        // Verificar se o produto existe
        const produtoExistente = await produtoModel.findById(pedido.produto);
        if (!produtoExistente) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        console.log("teste");
        console.log("teste");

        // Criar o novo item do pedido
        const produtosalvar = pedido.produto;
        const novoItem = {
            quantidade,
            produtosalvar
        };
        console.log(novoItem);

        // Adicionar o novo item ao array de produtos do pedido
        pedido.produtos.push(novoItem);
        console.log("teste2");

        // Calcular o novo preço total do pedido
        pedido.precototal = pedido.precototal + (produtoExistente.preco * quantidade);

        console.log("teste3");

        // Salvar as alterações no pedido
        await pedido.save();

        res.status(200).json(pedido);
    } catch (error) {
         res.status(500).json({ error: 'Erro ao adicionar item ao pedido' });
    }
  }

  async retornarPedidosPorCliente(req, res) {
    try {
      const clienteId = req.params.cliente;

      const cliente = await clienteModel.findOne({ codigo: clienteId });
      
      // Buscar pedidos do cliente pelo ID do cliente
      const pedidos = await pedidoModel.find({ cliente: cliente._id });
      
      // Retornar os pedidos encontrados
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os pedidos por cliente' });
    }
  }

  async retornarProdutosDoPedido(req, res) {
    
      const pedidoId = req.params.pedido;
  
      try {
        // Buscar o pedido pelo ID do pedido
        const pedido = await pedidoModel.findOne({ codigo: pedidoId }).populate('produtos.produto', 'nome preco');
    
        // Verificar se o pedido existe
        if (!pedido) {
          throw new Error('Pedido não encontrado');
        }
    
        // Extrair os produtos (nome, valor) e quantidade do pedido
        const produtosDoPedido = pedido.produtos.map(item => ({
          nome: item.produto.nome,
          preco: item.produto.preco,
          quantidade: item.quantidade
        }));
    
        return produtosDoPedido;
      } catch (error) {
        throw new Error('Erro ao buscar os produtos do pedido');
      }
  
    
  
    }
}
module.exports = new PedidoController();
