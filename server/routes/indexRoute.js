var express = require('express')
var router = express.Router()

var controller = require('../controllers/indexController')

router.get('/', controller.getLoginPage)

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router