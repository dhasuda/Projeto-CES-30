var express = require('express')
var app = express()
var sql = require('./database/db')
var bodyParser = require('body-parser')
var passport = require('passport')
var uuid = require('uuid/v4')
require('dotenv').config()

var indexRoute = require('./routes/indexRoute')

sql.connect(process.env.DB_CONNECTION_STRING, () => {})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// JS and CSS
app.use(express.static('public'))
// HTML
app.set('views', './views')

// Session
var expressSession = require('express-session');
app.use(expressSession({
    genid: (req) => {
        return uuid() // random string for session IDs
    },
    // store: new FileStore(),
    secret: 'super secret key 1234791HJ1K',
    resave: true,
    saveUninitialized: true
}))

require('./utils/passport.js') (passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRoute)
 
app.listen(3000)