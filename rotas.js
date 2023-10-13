const express = require('express');

const rotas = express();

const {
    listarCategorias,

} = require('./src/controladores/transacoesController.js');
//rotas usuarios
rotas.post('/usuario'); //cadastrarUsuario
rotas.post('/login'); //login do usuario
rotas.get('/usuario'); //detalhar usuario
rotas.put('/usuario'); //atualizar usuario

//rotas transacoes
rotas.get('/categorias', listarCategorias); //listar categorias
rotas.get('/transacao'); //listar transacoes do usuario
rotas.get('/transacao/:id'); //detalhar uma transacao do usuario logado
rotas.post('transacao'); //cadastrar transacao para o usuario logado
rotas.put('/transacao/:id'); //atualizar transacao do usuario logado
rotas.delete('transacao/:id'); //excluir transacao do usuario logado
rotas.get('/transacao/extrato'); //obter extrato das transações

module.exports = rotas;
