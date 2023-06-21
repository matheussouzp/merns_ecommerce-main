const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const clienteController = require('../controllers/clienteController');
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const clienteModel = require('../models/clienteModel');


router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorId);
router.put('/:codigo', upload.single('imagem'), clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);
router.post('/', upload.single('imagem'), clienteController.salvar);
router.post('/login', 
    [
        check("email", "Email inválido").not().isEmpty(),
        check("senha", "senha inválido").not().isEmpty(),
    ], clienteController.autenticar);
router.post('/validar', clienteController.validarToken);






module.exports = router;