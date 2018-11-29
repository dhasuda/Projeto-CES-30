var Query = require('../utils/query')

var Categoria = function(data) {
    this.data = data
}

Categoria.prototype.data = {}

Categoria.findById = function(id) {
    const query = 'SELECT * FROM categoria_prova WHERE id_categoria = @id'
    return Query.run(query, {id: id})
}

Categoria.findByName = function(name) {
    const query = 'SELECT * FROM categoria_prova WHERE nome = @name'
    return Query.run(query, {name: name})
}

Categoria.getAll = function() {
    const query = 'SELECT * FROM categoria_prova ORDER BY nome ASC'
    return Query.run(query)
}

module.exports = Categoria