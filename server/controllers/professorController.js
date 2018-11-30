var Proposta = require('../models/proposta')
var Categoria = require('../models/categoria')
var Aluno = require('../models/aluno')
var Prova = require('../models/prova')
var Unidade = require('../models/unidade')
var State = require('../models/state')
var datetime = require('../utils/datetime')
var Criterio = require('../models/criterio')

exports.getLoginPage = (req, res) => {
    console.log('req', req.user)
    res.render('professor/home.ejs')
}

exports.propostaCreate = (req, res) => {
    res.render('professor/proposta_create.ejs')
}

exports.categoriaCreate = (req, res) => {
    res.render('professor/categoria_create.ejs')
}

exports.criterioView = (req, res) => {
    if(req.query.json) {
        Criterio.getAll().then(result => {
            const data = result
            
            res.send(JSON.stringify(data))
            
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/criterio_view.ejs')
    }
}

exports.criterioCreate = (req, res) => {
    if(req.query.json) {
        Categoria.getAll().then(result => {
            const data = result
            res.send(JSON.stringify(data))
            
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/criterio_create.ejs')
    }
}

exports.criterioCreatePost = (req, res) => {
    const data = {
        nome: req.body.name,
        descricao: req.body.description,
        nota_total: parseInt(req.body.totalgrade),
        id_categoria: parseInt(req.body.category),
        passo: parseFloat(req.body.passo)
    }

    Criterio.new(data).then(() => {
        res.json({success: true});
    }, err =>  {
        res.json({success: false});
    })
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

exports.alunoTurma = (req, res) => {
    var id_professor = req.user.id_professor

    Aluno.findByProfessorAndTurma(id_professor, req.query.turmas).then(result => {
        res.send(JSON.stringify(result))
    }).catch(err => {
        res.send(null)
    })
}

exports.alunoView = (req, res) => {
    if (req.query.json) {
        var id_professor = req.user.id_professor

        Aluno.findByProfessor(id_professor).then(result => {
            data = result
            res.send(JSON.stringify(data))
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/aluno_view.ejs')
    }
}

exports.turmaView = (req, res) => {
    if (req.query.json) {
        var data = {
            turmas: null
        }
        Aluno.getTurmasByCoordenador(req.user.id_professor).then(result => {
            data.turmas = result
            res.send(JSON.stringify(data))
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/turma_view.ejs')
    }
}

exports.alunoCreate = (req, res) => {
    if (req.query.json) {
        var data = {
            unidades: null
        }
        Unidade.getAllFromProfessor(req.user.id_professor).then(result => {
            data.unidades = result
            res.send(JSON.stringify(data))
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/aluno_create.ejs')
    }
}

exports.provasDisponibilizadas = (req, res) => {
    if(req.query.json) {
        Prova.findByStateAndCoordenador(req.user.id_professor, [State.notSubmitted(), State.notCorrected()]).then(result => {
            data = result
            res.send(JSON.stringify(data))
        }).catch(err => {
            res.send(err)
        })
    } else {
        res.render('professor/prova_view_available.ejs')
    }
}

exports.correctProva = (req, res) => {
    var id = req.params.id
    res.render('professor/corrigir_prova.ejs', {id: id})
}

exports.getCriterios = (req, res) => {
    var id = req.query.id
    Criterio.getFromProva(id).then(result => {
        res.send(JSON.stringify(result))
    }).catch(err => {
        res.send(JSON.stringify({}))
    })
}

exports.uploadProposta = (req, res) => {
    Proposta.create(req.body.nome, req.user.id_professor).then(result => {
        res.send(JSON.stringify({success: true}))
    }).catch(err => {
        res.send(err)
    })
}

exports.uploadCategoria = (req, res) => {
    Categoria.create(req.body.nome).then(() => {
        res.json({success: true})
    }).catch(err => {
        res.json({success: true})
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
        id_proposta: req.body.coletanea,
        semana: req.body.semana,
        id_professor: req.user.id_professor,
        turmas: req.body.turmas
    }

    Prova.savePackage(data).then(() => {
        res.json({success: true});
    }).catch(err => {
        res.json({success: false});
    })
}

exports.alunoCreatePost = (req, res) => {
    var nome = req.body.nome
    var turma = req.body.turma
    var idUnidade = req.body.idUnidade
    
    Aluno.newAluno(nome, turma, idUnidade).then(() => {
        res.json({success: true})
    }).catch(err => {
        res.json({success: false})
    })
}