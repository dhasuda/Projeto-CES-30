var passport = require('passport')

exports.getLoginPage = (req, res) => {
    res.render('login.ejs')
}

exports.login = (req, res, next) => {
    console.log('LOGIN')
    return passport.authenticate('professorLogin', (err, user, info) => {
        if (err) {
            console.log('ERRO', err)
        }
        else if (!user) {
            console.log('NOT A USER')
        } else {
            res.send('oi')
        }
      })(req, res, next)
}

exports.register = (req, res, next) => {
    console.log('REGISTER')
    return passport.authenticate('newProfessor', (err, user, info) => {
        if (err) {
            console.log('ERRO', err)
        }
        else if (!user) {
            console.log('NOT A USER')
        } else {
            res.send('oi')
        }
        

      })(req, res, next)
}