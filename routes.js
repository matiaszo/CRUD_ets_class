// Iniciando Route do Express
const express = require('express');
const multer = require("multer");
const config = require('./src/config/multer');

const route = express.Router();
// Importando os Controllers
const home = require('./src/controllers/home');
const cadastro = require('./src/controllers/cadastro');
const cadastro_aluno = require('./src/controllers/cadastro_aluno');
const edit_aluno = require('./src/controllers/edit_aluno');
const edit_sala = require('./src/controllers/edit_sala');

route.get('/', home.pagInicialGet);
route.post('/', home.pagInicialPost);

route.get('/sala', cadastro.salaGet);
route.post('/sala', cadastro.salaPost);

route.get('/alunos', cadastro_aluno.alunoGet);
route.post('/alunos', multer(config).single('flImage'), cadastro_aluno.alunoPost);

route.get('/editarAluno/:id', edit_aluno.alunoEdit);
route.post('/editarAluno/:id', multer(config).single('flImage'), edit_aluno.adicionarAluno);

route.get('/editarSala/:id', edit_sala.salaEdit);
route.post('/editarSala/:id', edit_sala.adicionarSala);

module.exports = route;
