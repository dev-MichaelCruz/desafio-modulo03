const express = require('express');

const rotas = express();

const { listarCategorias } = require('./src/controladores/transacoesController.js');

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
rotas.get('/categorias', listarCategorias); //listar categorias
rotas.get('/transacao'); //listar transacoes do usuario
rotas.get('/transacao/:id'); //detalhar uma transacao do usuario logado
rotas.post('transacao'); //cadastrar transacao para o usuario logado
rotas.put('/transacao/:id'); //atualizar transacao do usuario logado
rotas.delete('transacao/:id'); //excluir transacao do usuario logado
rotas.get('/transacao/extrato'); //obter extrato das transações

module.exports = rotas;
