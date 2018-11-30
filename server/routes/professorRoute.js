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

router.get('/prova/disponibilizadas', controller.provasDisponibilizadas)
router.get('/prova/correcao/:id', controller.correctProva)

router.get('/prova/getCriterios', controller.getCriterios)

router.get('/categoria/criar', controller.categoriaCreate)

router.get('/criterio/criar', controller.criterioCreate)
router.post('/criterio/criar', controller.criterioCreatePost)

router.post('/proposta/subir', controller.uploadProposta)
router.post('/categoria/subir', controller.uploadCategoria)
router.post('/aluno/delegar', controller.createProva)
router.post('/aluno/criar', controller.alunoCreatePost)

module.exports = router