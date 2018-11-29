var passport = require('passport')

exports.getLoginPage = (req, res) => {
    res.render('login.ejs')
}

exports.login = (req, res, next) => {
    console.log('LOGIN')
    return passport.authenticate('professorLogin', (err, user, info) => {
        console.log('AUTHENTICATION COMPLETE')
        if (err) {
            console.log('ERRO', err)
            return res.json({success: false})
        }
        else if (!user) {
            console.log('NOT A USER')
            return res.json({success: false})
        } else {
            return res.json({success: true})
        }
      })(req, res, next)
}

exports.register = (req, res, next) => {
    return passport.authenticate('newProfessor', (err, user, info) => {
        console.log('AUTHENTICATION COMPLETE')
        if (err) {
            console.log('ERRO', err)
            return res.json({success: false})
        }
        else if (!user) {
            console.log('NOT A USER')
            return res.json({success: false})
        } else {
            return res.json({success: true})
        }
        

      })(req, res, next)
}