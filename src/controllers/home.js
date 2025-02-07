const sala = require('../models/sala')
const aluno = require('../models/aluno')

module.exports = {
    async pagInicialGet(req, res){
        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome']
            });

        const alunos = await aluno.findAll(
            {
                raw: true,
                attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
            }
        );

    res.render('../views/index', {salas, alunos, id:''});
    },
    async pagInicialPost(req, res){
        const id = req.body.sala;
        const alunos = await aluno.findAll(
            {
                raw: true,
                attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
                where: { IDSala: id }
            }
        );

        const salas = await sala.findAll(
            { 
                raw: true, 
                attributes: ['IDSala', 'Nome', 'Capacidade']  
            }
        );

        res.render('../views/index', {salas, alunos, id});
    }
}
    