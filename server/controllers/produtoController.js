const produtoModel = require('../models/produtoModel.js');
const multer = require('multer');
const categoriaModel = require('../models/categoriaModel.js');

const upload = multer({
    storage: multer.memoryStorage(), // Armazenando os dados em memória
  }); 


class ProdutoController {

  async salvar(req, res) {
    try {
    const produto = req.body;


    const max = await produtoModel.findOne({}).sort({ codigo: -1 });
    produto.codigo = max == null ? 1 : max.codigo + 1;


   
    const categoria = await categoriaModel.findOne({ codigo: produto.categoria });
    produto.categoria = categoria._id;
    
    console.log(req.file.path);
    // Verificar se uma imagem foi enviada
    if (req.file) {
      produto.imagem = req.file.path;
    } 
    console.log(produto.imagem);
    produto.url_img = produto.imagem;
    const resultado = await produtoModel.create(produto);
      res.status(201).json(resultado);
    } catch (error) {   
      res.status(500).json({ error: 'Erro ao criar o produto' });
    }
}

  async listar(req, res) {
    try {
      const resultado = await produtoModel.find({});
      res.status(200).json(resultado);
      
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os produtos' });
    }
  }

  async buscarPorId(req, res) {
    const codigo = req.params.codigo;
    const resultado = await produtoModel.findOne({ 'codigo': codigo });
    res.status(200).json(resultado);
}
  
async atualizar(req, res) {
  try {
    if (req.file) {
      console.log(req.file);
      req.body.imagem = req.file.path;
    }

    const codigo = req.params.codigo;
    const produto = await produtoModel.findOneAndUpdate({ codigo: codigo }, req.body);

    if (produto) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
}



  async excluir(req, res) {
    const codigo = req.params.codigo;
    const _id = String((await produtoModel.findOne({ 'codigo': codigo }))._id);
    await produtoModel.findByIdAndRemove(String(_id));
    res.status(200).send();
}
  

async adicionarComentario(req, res) {
  try {

    const codigo = req.params.codigo;

    const { texto, nota } = req.body;
    console.log(texto);
    console.log(nota);
    // Cria um objeto com os dados do comentário
    const novoComentario = {
      texto,
      nota
    };

    // Busca o produto pelo código
    const produto = await produtoModel.findOne({ codigo });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Adiciona o novo comentário ao array de comentários do produto
    produto.comentarios.push(novoComentario);

    // Recalcula a nota geral do produto
    const somaNotas = produto.comentarios.reduce((acumulador, comentario) => acumulador + comentario.nota, 0);
    produto.notaGeral = somaNotas / produto.comentarios.length;

    // Salva as alterações no produto
    await produto.save();

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar o comentário' });
  }
}

async obterComentarios(req, res) {
  try {
    const codigo = req.params.codigo;
    
    // Busca o produto pelo código
    const produto = await produtoModel.findOne({ codigo });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Extrai os textos e notas dos comentários do produto
    const comentarios = produto.comentarios.map(comentario => ({
      texto: comentario.texto,
      nota: comentario.nota
    }));

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os comentários do produto' });
  }
}

async listarDetalhes(req, res) {
  try {
    const codigo = req.params.codigo;

    // Busca o produto pelo código
    const produto = await produtoModel.findOne({ codigo });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Calcula a média das notas
    let mediaNotas = 0;
    if (produto.comentarios.length > 0) {
      const somaNotas = produto.comentarios.reduce((acumulador, comentario) => acumulador + comentario.nota, 0);
      mediaNotas = somaNotas / produto.comentarios.length;
    }

    // Cria um objeto com os detalhes do produto, incluindo a média das notas
    const detalhesProduto = {
      codigo: produto.codigo,
      nome: produto.nome,
      imagem: produto.imagem,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      animal: produto.animal,
      comentarios: produto.comentarios,
      mediaNotas
    };

    

    res.json(detalhesProduto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar detalhes do produto' });
  }
}


  
  
  
}

module.exports = new ProdutoController();