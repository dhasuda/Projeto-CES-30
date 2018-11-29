var express = require('express')
var app = express()
var sql = require('./database/db')
var bodyParser = require('body-parser')
var passport = require('passport')
var uuid = require('uuid/v4')
const assets = require('express-asset-versions')
require('dotenv').config()

sql.connect(process.env.DB_CONNECTION_STRING, () => {})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// JS and CSS
app.use(express.static('public'))
// HTML
app.set('views', './views')
// Deal with cache
app.use(assets('', 'public'))

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

// Only JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/js', express.static(__dirname + '/node_modules/chart.js/dist'))
app.use('/js', express.static(__dirname + '/node_modules/jquery.easing'))
app.use('/js', express.static(__dirname + '/node_modules/sweetalert/dist'))
app.use('/js', express.static(__dirname + '/node_modules/binaryjs/dist'))
app.use('/js', express.static(__dirname + '/node_modules/hashids/dist/'))

// JS and CSS
app.use('/js', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build/js'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-select/dist/js'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname + '/node_modules/semantic-ui/dist/components'))
app.use('/js', express.static(__dirname + '/node_modules/semantic-ui/dist/'))
app.use('/css', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build/css'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-select/dist/css'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/css', express.static(__dirname + '/node_modules/semantic-ui/dist/components'))
app.use('/css', express.static(__dirname + '/node_modules/semantic-ui/dist/'))

// Datatables
app.use('/js', express.static(__dirname + '/node_modules/datatables.net/js'))
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-bs4/js'))
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-buttons/js'))
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-buttons-bs4/js'))
app.use('/js', express.static(__dirname + '/node_modules/jquery-datatables-checkboxes/js'))
app.use('/css', express.static(__dirname + '/node_modules/datatables.net-bs4/css'))
app.use('/css', express.static(__dirname + '/node_modules/datatables.net-buttons-bs4/css'))
app.use('/js', express.static(__dirname + '/node_modules/datatables-fixedheader/js'))

// Others
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui-dist'))
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome'))

var indexRoute = require('./routes/indexRoute')
var professorRoute = require('./routes/professorRoute')

app.use('/', indexRoute)
app.use('/professor', professorRoute)
 
app.listen(3000)