var express = require('express')
var router = express.Router()

var controller = require('../controllers/professorController')

router.get('/', controller.getLoginPage)
router.get('/proposta/criar', controller.propostaCreate)
router.get('/proposta/visualizar', controller.propostaView)
router.get('/proposta/buscar/:id', controller.propostaSpecific)

router.get('/prova/disponibilizar', controller.disponibilizarProva)

router.get('/aluno/visualizar', controller.alunoView)
router.get('/turma/visualizar', controller.turmaView)

router.post('/proposta/subir', controller.uploadProposta)
router.post('/aluno/delegar', controller.createProva)

module.exports = router