const pool = require('../conexao.js');
const bcrypt = require('bcrypt');

module.exports = {
    async registrarUsuario(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const usuarioEncontrado = await pool.query(
                'SELECT * FROM usuarios WHERE email = $1',
                [email]
            );

            const crypSenha = await bcrypt.hash(senha, 10);

            if (usuarioEncontrado.rows.length > 0) {
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com e-mail informado' });
            }

            const cadastrarUsuario = await pool.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
                [nome, email, crypSenha]
            );

            return res.status(201).json(cadastrarUsuario.rows[0]);

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async getUsuario(req, res) {
        //console.log('req usuario ', req.usuario);
        try {
            return res.json(req.usuario);
        } catch (error) {
            console.error("Simulando erro", error)
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async atualizarUsuario(req, res) {
        const { id } = req.usuario;
        const { nome, email, senha } = req.body;

        try {

            const crypSenha = await bcrypt.hash(senha, 10);
            await pool.query(
                'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
                [nome, email, crypSenha, id]
            )

            return res.status(200).end();

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}


