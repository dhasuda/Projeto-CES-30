var Proposta = require('../models/proposta')

exports.getLoginPage = (req, res) => {
    res.render('professor/home.ejs')
}

exports.propostaCreate = (req, res) => {
    res.render('professor/proposta_create.ejs')
}

exports.uploadProposta = (req, res) => {
    Proposta.create(req.body.nome, req.user)
}