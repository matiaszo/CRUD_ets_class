const sala = require('../models/sala')
const aluno = require('../models/aluno') 
const fs = require('fs');

module.exports =    
{
    async alunoEdit(req, res)
    {    
        const parametro = req.params.id;
        const alunos = await aluno.findByPk(parametro,
            {
                raw: true,
                attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
            }
        );
        const salas = await sala.findAll(
            {
                raw: true,
                attributes: ['IDSala', 'Nome']
            }
        );
        res.render('../views/editarAluno', {salas, alunos});
    },
    async adicionarAluno(req, res){
        const dados = req.body;
        const id = req.params.id;
        // Dando upgrade nas novas informações
        if (req.file){
            const antigaFoto = await aluno.findAll(
                {
                    raw: true,
                    attributes: ['Foto'],
                    where: {IDAluno: id}
                }
            );
            if (antigaFoto[0].Foto != 'default_person.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, (err =>{if(err) console.log(err);}))

            await aluno.update(
                {Foto: req.file.filename},
                {where: {IDAluno: id}}
            );
        }
        await aluno.update(
            {
                Nome: dados.nome,
                Idade: dados.idade,
                Sexo: dados.sexo,
                IDSala: dados.sala
            },
            {
                where: { IDAluno: id }
            }
        );
        res.redirect('/');
    }
}
