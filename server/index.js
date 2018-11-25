var express = require('express')
var app = express()
var sql = require('./database/db')
var bodyParser = require('body-parser')
require('dotenv').config()

var indexRoute = require('./routes/indexRoute')

sql.connect(process.env.DB_CONNECTION_STRING, () => {})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Session
var expressSession = require('express-session');
app.use(expressSession({secret: 'minhaChaveSecreta'}));

// JS and CSS
app.use(express.static('public'))
// HTML
app.set('views', './views')

app.use('/', indexRoute)
 
app.listen(3000)