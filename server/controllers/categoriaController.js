const categoriaModel = require('../models/categoriaModel.js');

class CategoriaController {
    
    async salvar(req, res) {
        try {
          let categoria = req.body;
        
          const max = await categoriaModel.findOne({}).sort({ codigo: -1 });
          categoria.codigo = max == null ? 1 : max.codigo + 1;

          
          const resultado = await categoriaModel.create(categoria);
          res.status(201).json(resultado);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao criar categoria' });
        }
      }

    async listar(req, res) {
        const resultado = await categoriaModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        const resultado = await categoriaModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }


    async atualizar(req, res) {
      try {
        const codigo = req.params.codigo;
        const categoria = await categoriaModel.findOne({ 'codigo': codigo });
    
        if (categoria) {
          if (req.file) {
            req.body.foto = req.file.path;
          }
    
          await categoriaModel.findByIdAndUpdate(categoria._id, req.body);
          res.status(200).send();
        } else {
          res.status(404).json({ error: 'Categoria não encontrada' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a categoria' });
      }
    }
    
    
    


    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await categoriaModel.findOne({ 'codigo': codigo }))._id);
        await categoriaModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }
}

module.exports = new CategoriaController();