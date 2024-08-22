const aluno = require('../models/aluno');
const sala = require('../models/sala')


module.exports = {
    async aluno(req, res){
        const salas = await sala.findAll(
            {
                raw: true,
                attributes: ['IDSala', 'Nome']
            }
        );
        res.render('../views/alunos', {salas});
    },
    async alunoInsert(req, res){
        // Recebe as informações do front-end
        const dados = req.body;
        let foto = 'default_person.png';
        if (req.file) {
            foto = req.file.filename;
            }
        // Criando sala no banco de dados
        await aluno.create(
            {
                Nome: dados.name,
                Idade: dados.idade,
                Sexo: dados.sexo,
                Foto: foto,
                IDSala: dados.sala
            }
        );
    // Redirecionar para a página principal
        res.redirect('/');
    }
}