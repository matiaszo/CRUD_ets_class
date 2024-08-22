const sala = require('../models/sala');


module.exports = 
{
    async salaEdit(req, res)
    {
        const parametro = req.params.id;
        const salas = await sala.findByPk(parametro,
        {
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade']
        }
    );
    console.log("Entrei na sala")
    res.render('../views/editarSala', {salas});
    },
    async adicionarSala(req, res)
    {
        const dados = req.body;
        const id = req.params.id;

        await sala.update(
            {
                Nome: dados.nome,
                Capacidade: dados.capacidade
            },
            {
                where: {IDSala: id}
            }
        );
        console.log("Sala atualizada");
        res.redirect('/');
    }
}