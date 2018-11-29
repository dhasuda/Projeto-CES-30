var express = require('express')
var router = express.Router()

var controller = require('../controllers/professorController')

router.get('/', controller.getLoginPage)
router.get('/proposta/criar', controller.propostaCreate)
router.get('/proposta/visualizar', controller.propostaView)
router.get('/proposta/buscar/:id', controller.propostaSpecific)

router.post('/proposta/subir', controller.uploadProposta)

module.exports = router