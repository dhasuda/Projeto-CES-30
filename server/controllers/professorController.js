var Proposta = require('../models/proposta')
var Categoria = require('../models/categoria')
var Aluno = require('../models/aluno')
var Prova = require('../models/prova')

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

exports.disponibilizarProva = (req, res) => {
    
    var id_professor = req.user.id_professor
    var data = {
        categorias: null,
        coletaneas: null,
        turmas: null
    }

    if(req.query.json) {
        
        Categoria.getAll().then(result => {
            data.categorias = result
            Proposta.findByProfessor(id_professor).then(result => {
                data.coletaneas = result

                Aluno.getAllClassroomsForCoordenador(id_professor).then(result => {
                    data.turmas = result
                    res.send(JSON.stringify(data))
                    
                }).catch(err => {
                    res.send(err)
                })
            }).catch(err => {
                res.send(err)
            })
        }).catch(err => {
            res.send(err)
        })
    } else {
        Aluno.getAllClassroomsForCoordenador(id_professor).then(result => {
            data.turmas = result
            res.render('professor/prova_create.ejs', { data: data })
            
        }).catch(err => {
            res.send(err)
        })
    }

}

exports.uploadProposta = (req, res) => {
    Proposta.create(req.body.nome, req.user.id_professor).then(result => {
        res.send(JSON.stringify({success: true}))
    }).catch(err => {
        res.send(err)
    })
}

exports.createProva = (req, res) => {
    var deadline = req.body.datalimite
    var day = deadline.split("/")[0]
    var month = deadline.split("/")[1]
    var remaining = deadline.split("/")[2]
    var year = remaining.split(" ")[0]
    var hours = remaining.split(" ")[1].split(":")[0]
    var minutes = remaining.split(" ")[1].split(":")[1]
    
    deadline = year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2) + ' ' + hours + ':' + minutes + ':00'
    
    var data = {
        estado: State.notSubmitted(),
        datahora_criacao: datetime.getDateTime(),
        datahora_validade: deadline,
        arquivo: req.body.arquivo,
        pacote: datetime.getDateTime(),
        id_categoria: req.body.categoria,
        categorias: req.body.categoria,
        id_coletanea: req.body.coletanea,
        semana: req.body.semana,
        rm_coordenador: req.user.id_professor
    }
    
    var students = req.body.alunos
    console.log('HERE', data, students)
    res.json({success: true});
    // Prova.savePackage(students, data).then(() => {
    //     res.json({success: true});
    // }).catch(err => {
    //     res.json({success: false});
    // })
}