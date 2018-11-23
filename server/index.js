var express = require('express')
var app = express()
 
var indexRoute = require('./routes/indexRoute')

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)