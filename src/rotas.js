const express = require('express');

const rotas = express();

const {
    listarCategorias, listarTransacoes, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, extratoTransacoes,
} = require('./controladores/transacoesController.js');

const {
    registrarUsuario
} = require('./controladores/usuariosController.js');

//rotas usuarios
rotas.post('/usuario', registrarUsuario); //cadastrarUsuario
rotas.post('/login'); //login do usuario
rotas.get('/usuario'); //detalhar usuario
rotas.put('/usuario'); //atualizar usuario

//rotas transacoes
rotas.get('/categorias', listarCategorias); //OK
rotas.get('/transacao', listarTransacoes); //OK
rotas.get('/transacao/:id', detalharTransacao); //detalhar uma transacao do usuario logado
rotas.post('/transacao', cadastrarTransacao); //cadastrar transacao para o usuario logado
rotas.put('/transacao/:id', atualizarTransacao); //atualizar transacao do usuario logado
rotas.delete('transacao/:id', excluirTransacao); //excluir transacao do usuario logado
rotas.get('/transacao/extrato', extratoTransacoes); //obter extrato das transações

module.exports = rotas;
