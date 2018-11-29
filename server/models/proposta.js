var Query = require('../utils/query')
var Proposta = {}

Proposta.create = (nome, rm_coordenador) => {
    var query = "insert into proposta (nome, arquivo, rm_coordenador) VALUES (@nome, '0', @rm_coordenador)"
    return Query.run(query, {nome: nome, rm_coordenador: rm_coordenador})
}

module.exports = Proposta