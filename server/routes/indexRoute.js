var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    console.log(process.env.DB_CONNECTION_STRING)
    res.send('Hello World')
})


module.exports = router