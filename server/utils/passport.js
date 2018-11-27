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
            console.log('1')
            Professor.findByUsername(username).then(result => {
                console.log('2')
                if (result.length > 0) {
                    console.log('3')
                    return done(null, false, { message: 'Invalid username.' })
                } else {
                    console.log('4')
                    var name = req.body.name
                    console.log('4.1')
                    const saltRounds = 10
                    console.log('4.2')
                    var secretPassword = bcrypt.hashSync(password, saltRounds)
                    console.log('4.3')
                    Professor.createNewProfessor(name, username, secretPassword).then(result => {
                        console.log('5')
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
            console.log('USER', user)
            done(null, 1)
        })

        passport.deserializeUser((id, done) => {
            console.log('ID', id)
            done(null, 1)
        })

}