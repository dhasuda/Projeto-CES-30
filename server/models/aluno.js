var Query = require('../utils/query')

var Aluno = function(data) {
    this.data = data
}

Aluno.prototype.data = {}

Aluno.newAluno = function(nome, turma, unidadeId) {
    const query =   " insert into aluno (nome, usuario, senha, turma, ativo, id_unidade) values (@nome, @nome, '0', @turma, 1, @unidadeId)"
    
    return Query.run(query, {nome: nome, turma: turma, unidadeId: unidadeId})
}

Aluno.getAllClassroomsForCoordenador = function(id) {
    const query =   " SELECT turma FROM aluno a  " +
                    " INNER JOIN unidade_professor uc ON uc.id_unidade = a.id_unidade AND uc.preferencial = 1  " +
                    " WHERE uc.id_professor = @id GROUP BY turma ORDER BY turma "
    
    return Query.run(query, {id: id})
}

Aluno.findByProfessor = function(professorId) {
    var query = " SELECT A.id_aluno, A.nome, A.usuario, A.turma, U.nome AS unidade " +
                " FROM aluno A " +
                " INNER JOIN unidade_professor C ON C.id_unidade = A.id_unidade AND C.preferencial = 1 " +
                " LEFT JOIN unidade U ON A.id_unidade = U.id_unidade " +
                " WHERE C.id_professor = @professorId " +
                " ORDER BY A.id_unidade, A.id_aluno "
    
    return Query.run(query, {professorId: professorId})
}

Aluno.getTurmasByCoordenador = function(professorId) {
    var query = 
                " select a.turma, count(r.id_prova) redacoes,   " +
                " sum(case when r.estado = 'not submitted' then 1 else 0 end) nao_submetidas,   " +
                " sum(case when r.estado = 'not corrected' then 1 else 0 end) nao_corrigidas,   " +
                " sum(case when r.estado = 'in correction' then 1 else 0 end) em_correcao,   " +
                " sum(case when r.estado = 'corrected' then 1 else 0 end) corrigidas,   " +
                " sum(case when r.estado = 'published' then 1 else 0 end) publicadas   " +
                " from aluno a   " +
                " left join unidade_professor u on u.id_unidade = a.id_unidade   " +
                " left join prova r on r.id_aluno = a.id_aluno " +
                " where u.id_professor = @professorId and u.preferencial = 1   " +
                " group by a.turma   " +
                " order by a.turma asc "

    return Query.run(query, {professorId: professorId})
}

module.exports = Aluno