var Query = require('../utils/query')

var Prova = function(data) {
    this.data = data
}

Prova.prototype.data = {}

Prova.savePackage = function(data) {
    var query = " INSERT INTO prova (estado, datahora_criacao, datahora_validade, arquivo, pacote, id_aluno, id_professor, id_categoria, id_proposta, semana) " +
                " select @estado, @datahora_criacao, @datahora_validade, '', '', a.id_aluno, @id_professor, @id_categoria, @id_proposta, @semana " +
                " from aluno a " +
                " where a.turma in (@turmas) "
    
    return Query.run(query, data)
}

module.exports = Prova