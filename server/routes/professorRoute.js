var express = require('express')
var router = express.Router()

var controller = require('../controllers/professorController')

router.get('/', controller.getLoginPage)


module.exports = router