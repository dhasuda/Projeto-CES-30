var Proposta = require('../models/proposta')

exports.getLoginPage = (req, res) => {
    console.log('req', req.user)
    res.render('professor/home.ejs')
}

exports.propostaCreate = (req, res) => {
    res.render('professor/proposta_create.ejs')
}

exports.propostaView = (req, res) => {
    console.log('view')
    if (req.query.json) {
        console.log('HERE')
        Proposta.findByProfessor(req.user.id_professor).then(result => {
            console.log('RES', result)
            res.send(JSON.stringify(result))
        }).catch(err => {
            console.log('ERR')
            res.send(err)
        })
    } else {
        res.render('professor/proposta_view.ejs')
    }
}

exports.propostaSpecific = (req, res) => {
    Proposta.findById(req.params.id).then(result => {
        res.send(JSON.stringify(result))
    }).catch(err => {
        res.send(err)
    })
}

exports.uploadProposta = (req, res) => {
    console.log('NEW PROPOSTA')
    Proposta.create(req.body.nome, req.user.id_professor).then(result => {
        res.send(JSON.stringify({success: true}))
    }).catch(err => {
        res.send(err)
    })
}