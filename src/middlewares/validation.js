module.exports = {
    validaCampoCadastro(req, res, next) {
        const { nome, email, senha } = req.body;
    
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos (nome, email, senha) são obrigatórios para o cadastro.' });
        }
        console.log('validou campo cadastro')
        next();
    },
    
    validaCampoLogin(req, res, next) {
        const { email, senha } = req.body;
    
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Os campos de e-mail e senha são obrigatórios para o login.' });
        }
        console.log('validou campo login')
    
        next();
    }
}

