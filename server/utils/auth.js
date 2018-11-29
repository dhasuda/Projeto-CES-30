exports.professor = function (req, res, next) {
    if (req.isAuthenticated() && req.user.id_professor != undefined) { 
        auth_body(req, res, req.user.id_professor, "professor")

        next()
    } else {
        req.logout()
        req.session.destroy(err => {
            res.redirect('/')
        })
    }
}