var Query = require('../utils/query')
var Proposta = {}

Proposta.create = (nome, rm_coordenador) => {
    var query = "insert into proposta (nome, arquivo, rm_coordenador) VALUES (@nome, '0', @rm_coordenador)"
    return Query.run(query, {nome: nome, rm_coordenador: rm_coordenador})
}

Proposta.findById = (id) => {
    var query = 'SELECT * FROM coletanea WHERE id_coletanea = @id'
    return Query.run(query, {id: id})
}

Proposta.findByProfessor = (professorId) => {
    const query =   'select c.id_proposta id_proposta, MAX(c.nome) nome, MAX(c.arquivo) arquivo, @professorId id_professor, COUNT(unidade_pref.id_prova) quantidade_provas ' +
                    'from proposta c ' +
                    'left outer join (select distinct r.id_prova id_prova, r.id_proposta proposta from prova r ' +
                        'left join aluno a on a.id_aluno = r.id_aluno ' +
                        'inner join unidade_professor uc on a.id_unidade = uc.id_unidade and uc.preferencial = 1) unidade_pref on unidade_pref.proposta = c.id_proposta ' +
                    'group by c.id_proposta ' +
                    'order by nome asc'
    
    return Query.run(query, {professorId: professorId})
}

module.exports = Proposta