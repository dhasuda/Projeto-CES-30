var express = require('express')
var app = express()
var sql = require('./database/db')
require('dotenv').config()
 
var indexRoute = require('./routes/indexRoute')

sql.connect(process.env.DB_CONNECTION_STRING, () => {})

app.use('/', indexRoute)
 
app.listen(3000)