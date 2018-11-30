var Query = require('../utils/query')

var Criterio = function(data) {
    this.data = data
}

Criterio.prototype.data = {}

Criterio.new = function(data) {
    var query = "insert into criterio (nome, descricao, nota_total, passo, id_categoria) values (@nome, @descricao, @nota_total, @passo, @id_categoria)"

    return Query.run(query, data)
}

Criterio.getFromProva = function(provaId) {
    const query =
                    " select c.* " + 
                    " from criterio c " + 
                    " inner join prova p on p.id_categoria = c.id_categoria " + 
                    " where p.id_prova = @provaId "

    return Query.run(query, {provaId: provaId})
}

Criterio.getAll = function() {
    var query = 'SELECT cr.nome categoria, c.nome criterio, c.nota_total nota, c.id_criterio id_criterio, c.descricao descricao, c.passo passo, c.id_categoria id_categoria FROM criterio c LEFT JOIN categoria_prova cr ON c.id_categoria = cr.id_categoria ORDER BY categoria ASC, criterio ASC'

    return Query.run(query)
}

module.exports = Criterio