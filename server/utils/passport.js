passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var Professor = require('../models/professor')

module.exports = (passport) => {
   
    passport.use('newProfessor', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password'
        },
        (id, password, done) => {
            Professor.findByUsername(login).then(result => {
                if (result.length > 0) {

                } else {
                    
                }
            }).catch(e => {
                return done(null, false, { message: 'Something with db went wrong' })
            })
        }
    ))

    passport.use('professorLogin', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password'
        },
        (id, password, done) => {
            
        }
    ))

}