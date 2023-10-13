const pool = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await pool.query('select * from categorias');
        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro do servidor' });
    }
}

const listarTransacoes = async (req, res) => {
    const { id: usuario_id } = req.usuario;
    const { filtro } = req.query;

    try {

    } catch {

    }
}

const detalharTransacao = async (req, res) => {

}


module.exports = {
    listarCategorias,

}