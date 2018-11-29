var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt')
var Professor = require('../models/professor')

module.exports = (passport) => {
   
    passport.use('newProfessor', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            
            Professor.findByUsername(username).then(result => {
                
                if (result.length > 0) {
                    return done(null, false, { message: 'Invalid username.' })
                } else {
                    var name = req.body.name
                    const saltRounds = 10
                    var secretPassword = bcrypt.hashSync(password, saltRounds)
                    Professor.createNewProfessor(name, username, secretPassword).then(result => {
                        return done(null, result[0])
                    }).catch(e => {
                        return done(null, false, { message: 'Something with db went wrong' })
                    })
                }
            }).catch(e => {
                return done(null, false, { message: 'Something with db went wrong' })
            })
        }
    ))

    passport.use('professorLogin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            Professor.findByUsername(username).then(result => {
                if (result.length > 0) {
                    var secretPassword = result[0].senha
                    if (bcrypt.compareSync(password, secretPassword)) {
                        return done(null, result[0])
                    } else {
                        return done(null, false, { message: 'Invalid user or password' })    
                    }
                } else {
                    return done(null, false, { message: 'Invalid user or password' })
                }
            }).catch(e => {
                return done(null, false, { message: 'Something with db went wrong' })
            })
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((id, done) => {
        done(null, id)
    })

}