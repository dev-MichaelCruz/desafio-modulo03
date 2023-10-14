const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async authentication(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Os campos de e-mail e senha são obrigatórios!' });
        }

        try {
            const usuario = await pool.query(
                'SELECT * FROM usuarios WHERE email = $1',
                [email]
            );

            if (usuario.rowCount < 1) {
                return res.status(404).json({ mensagem: 'E-mail ou senha inválidos!' });
            }

            const validaSenha = await bcrypt.compare(senha, usuario.rows[0].senha);

            if (!validaSenha) {
                return res.status(400).json({ mensagem: 'E-mail ou senha inválidos!' });
            }

            
            const { senha: _, ...usuarioLogado } = usuario.rows[0];

            
            const token = jwt.sign({ id: usuario.rows[0].id }, 'TESTEMODULO3', { expiresIn: '1h' });

            return res.status(200).json({ usuario: usuarioLogado, token });

        } catch (error) {
            console.error('Erro interno do servidor:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async validaToken(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ mensagem: 'Token não fornecido.' });
        }

        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), 'seu_segredo_aqui');
            req.usuarioId = decoded.id;
            next();
        } catch (error) {
            return res.status(403).json({ mensagem: 'Token inválido.' });
        }
    }
};
