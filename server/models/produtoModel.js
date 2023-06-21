const mongoose = require('mongoose');


const produtoSchema = new mongoose.Schema({
  codigo: Number,
  nome: String,
  imagem: Buffer,
  descricao: String,
  preco: Number,
  url_img: String,
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categorias'
  },
  animal: String,
  comentarios: [{
    texto: String,
    nota: Number
  }]
}); 



module.exports = mongoose.model('produtos', produtoSchema);
