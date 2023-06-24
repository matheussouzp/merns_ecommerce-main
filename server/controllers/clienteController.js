const clienteModel = require('../models/clienteModel.js');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator/check");

const upload = multer({
    storage: multer.memoryStorage(), // Armazenando os dados em memória
  });

class ClienteController {
    
    async salvar(req, res) {
        try {
          let cliente = req.body;
          

          const max = await clienteModel.findOne({}).sort({ codigo: -1 });
          cliente.codigo = max == null ? 1 : max.codigo + 1;

          const clienteExistente = await clienteModel.findOne({ 'email': cliente.email });

          if (clienteExistente) {
            return res.status(400).json({ error: 'Nome de email já existente!' });
          }

          // Verificar se uma imagem foi enviada
          if (req.file) {
            
            cliente.imagem = req.file.path;
          }
          console.log(cliente.email);
          cliente.admin = false;
          
          await clienteModel.create(cliente);
          const clientenovo = await clienteModel.findOne({ email : cliente.email})
          const id = clientenovo._id;

          const token = jwt.sign({ id }, process.env.jwt_key, {
              expiresIn: "50m",
            });

            res
              .cookie("jwt_token", token)
              .status(200)
              .send({ message: "Loggin ", token, created: true });

          
          return clientenovo;
        } catch (error) {
          res.status(500).json({ error: 'Erro ao criar o perfil' });
        }
    }

    async listar(req, res) {
        const resultado = await clienteModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorEmail(req, res) {
      const email = req.params.email;
      const resultado = await clienteModel.findOne({ 'email': email });
      res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        const resultado = await clienteModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }

    async atualizar(req, res) {
        try {
          if (req.file) {
            console.log(req.file);
            req.body.imagem = req.file.path;
          }
      
          const codigo = req.params.codigo;
          const cliente = await clienteModel.findOneAndUpdate({ codigo: codigo }, req.body);
      
          if (cliente) {
            res.status(200).send();
          } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar o perfil' });
        }
    }
    
    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);
        await clienteModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    } 

    async autenticar(req, res) {    
      
        const { email, senha } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
          res.json({ error: error.array(), error_type: 0 });
          return;
        }
        const cliente = await clienteModel.findOne({ email : email})
    
        if (!cliente) {
          res.json({ message: "Email incorreto", error_type: 1 });
          return;
        }       
        
        if (senha == cliente.senha) {
          const id = cliente._id;
          const token = jwt.sign({ id }, process.env.jwt_key, {
            expiresIn: "50m",
          });
          
          const resposta = {
            message: "Login",
            token,
            created: true,
            codigo: cliente.codigo,
          };
          
          res
            .cookie("jwt_token", token)
            .status(200)
            .send(resposta);
        } else {
          res.json({ message: "Invalid Account", created: false });
        }
        
        return cliente;
    }
    
    async validarToken(req, res,next) {
      const { token } = req.body;
      jwt.verify(token, process.env.jwt_key, async (err, valid_token) => {
        if (err) {
          res.json({ status: false });
          return;
        }
        const id = valid_token.id;
        const cliente = await clienteModel.findById(id);   
        if (!cliente) {
          res.json({ status: false });
          return;
        }
        res.json({
          codigo: cliente.codigo,
          admin: cliente.admin,
          status: true,
          username: cliente.nome,
          email: cliente.email,
        });
      });
    }



}




module.exports = new ClienteController();