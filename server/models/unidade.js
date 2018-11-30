var Query = require('../utils/query')

var Unidade = function(data) {
    this.data = data
}

Unidade.prototype.data = {}

Unidade.getAllFromProfessor = function(professorId) {
    const query = 
                    " select u.* from unidade u " +
                    " inner join unidade_professor up on up.id_unidade = u.id_unidade " +
                    " where up.id_professor = @professorId "
    
    return Query.run(query, {professorId: professorId})
}

module.exports = Unidade