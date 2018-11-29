var express = require('express')
var router = express.Router()

var controller = require('../controllers/indexController')

router.get('/', controller.getLoginPage)

router.post('/login', controller.login)
router.post('/register', controller.register)

router.get('/teste', (req, res) => {
    
    var prof = require('../models/professor')
    prof.getAll().then(result => {
        res.send(result)
    })
    
})

module.exports = router