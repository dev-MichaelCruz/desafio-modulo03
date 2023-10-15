const express = require('express');

const rotas = express();

const { listarCategorias, listarTransacoes, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, extratoTransacoes
} = require('./src/controladores/transacoesController.js');

const { registrarUsuario, getUsuario, atualizarUsuario } = require('./src/controladores/usuariosController.js');

const { authentication, validaToken } = require('./src/middlewares/authentication.js');
const { validaCampoCadastro, validaCampoLogin } = require('./src/middlewares/validation.js');


//rotas usuarios
rotas.post('/usuario', validaCampoCadastro, registrarUsuario); //cadastrarUsuario
rotas.post('/login', validaCampoLogin, authentication); //login do usuario

rotas.use(validaToken); //Os endpoints abaixo só podem funcionar se for valido o token. 

rotas.get('/usuario', getUsuario); //detalhar usuario
rotas.put('/usuario', atualizarUsuario); //atualizar usuario

//rotas transacoes
rotas.get('/categoria', listarCategorias); //listar categorias
rotas.get('/transacao', listarTransacoes); //listar transacoes do usuario
rotas.get('/transacao/extrato', extratoTransacoes); //obter extrato das transações
rotas.get('/transacao/:id', detalharTransacao); //detalhar uma transacao do usuario logado
rotas.post('/transacao', cadastrarTransacao); //cadastrar transacao para o usuario logado
rotas.put('/transacao/:id', atualizarTransacao); //atualizar transacao do usuario logado
rotas.delete('/transacao/:id', excluirTransacao); //excluir transacao do usuario logado

module.exports = rotas;
