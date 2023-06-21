const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigo: Number,
  precototal: Number,
  produtos: [{
    quantidade: Number,
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'produtos'
    }
  }],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes'
  },
  status: String,
  dataHora: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('pedidos', pedidoSchema);
