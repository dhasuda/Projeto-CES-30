var passport = require('passport')

exports.getLoginPage = (req, res) => {
    res.render('login.ejs')
}

exports.login = (req, res, next) => {
    passport.authenticate('professorLogin', (err, user, info) => {
        if (err) {
            return res.json({success: false})
        }
        else if (!user) {
            return res.json({success: false})
        } else {
            req.login(user, err => {
                if (err) {
                    return res.json({success: false})
                }
                return res.json({success: true})
            })
        }
      })(req, res, next)
}

exports.register = (req, res, next) => {
    passport.authenticate('newProfessor', (err, user, info) => {
        
        if (err) {
            return res.json({success: false})
        }
        if (!user) {
            return res.json({success: false})
        }
        req.login(user, err => {
            if (err) {
                return res.json({success: false})
            }
            return res.send(user)
        })
      })(req, res, next)
}