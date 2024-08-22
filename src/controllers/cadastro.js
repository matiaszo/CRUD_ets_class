// Importando as tabelas do DB
const sala = require('../models/sala');

module.exports = {
    async sala(req, res){
        res.render('../views/sala');
    },
    async salaInsert(req, res){
        // Recebe as informações do front-end
        const dados = req.body;
        // Criando sala no banco de dados
        await sala.create({
        Nome: dados.nome,
        Capacidade: dados.capacidade
        });
    // Redirecionar para a página principal
        res.redirect('/');
    }
}