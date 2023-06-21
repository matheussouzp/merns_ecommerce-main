const mongoose = require('mongoose');

const clienteSchema  = new mongoose.Schema({
    codigo: Number,
    imagem: Buffer,
    nome: String,
    endereco: String,  
    telefone: String,
    cpf: Number,
    cartaoNome: String,
    cartaoNumero: Number,
    cvc: Number,
    email: String,
    senha: String,
    admin: Boolean
    
    });
    

module.exports = mongoose.model('clientes', clienteSchema);