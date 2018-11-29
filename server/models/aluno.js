var Query = require('../utils/query')

var Aluno = function(data) {
    this.data = data
}

Aluno.prototype.data = {}

Aluno.getAllClassroomsForCoordenador = function(id) {
    const query =   " SELECT turma FROM aluno a  " +
                    " INNER JOIN unidade_professor uc ON uc.id_unidade = a.id_unidade AND uc.preferencial = 1  " +
                    " WHERE uc.id_professor = @id GROUP BY turma ORDER BY turma "
    
    return Query.run(query, {id: id})
}

module.exports = Aluno