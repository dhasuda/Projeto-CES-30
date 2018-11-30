var express = require('express')
var router = express.Router()

var controller = require('../controllers/professorController')

router.get('/', controller.getLoginPage)
router.get('/proposta/criar', controller.propostaCreate)
router.get('/proposta/visualizar', controller.propostaView)
router.get('/proposta/buscar/:id', controller.propostaSpecific)

router.get('/prova/disponibilizar', controller.disponibilizarProva)
router.get('/aluno/turma', controller.alunoTurma)

router.get('/aluno/visualizar', controller.alunoView)
router.get('/turma/visualizar', controller.turmaView)
router.get('/aluno/criar', controller.alunoCreate)

router.post('/proposta/subir', controller.uploadProposta)
router.post('/aluno/delegar', controller.createProva)
router.post('/aluno/criar', controller.alunoCreatePost)

module.exports = router