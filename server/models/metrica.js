var Query = require('../utils/query')

var Metrica = function(data) {
    this.data = data
}

Metrica.prototype.data = {}

Metrica.getAverageByClassFromCoordenador = function(idProfessor) {
    const query =   " select a.turma, avg(provas.nota * 10/provas.nota_maxima) media  " +
                    " from aluno a  " +
                    " inner join unidade_professor uc on uc.id_unidade = a.id_unidade  " +
                    " inner join (  " +
                        " select r.id_prova, max(r.id_aluno) id_aluno, max(r.id_proposta) id_coletanea, sum(rc.notaparcial) nota, sum(c.nota_total) nota_maxima  " +
                        " from prova r  " +
                        " left join resultado_criterio rc on rc.id_prova = r.id_prova  " +
                        " left join criterio c on c.id_criterio = rc.id_criterio  " +
                        " where rc.notaparcial is not null and r.estado = 'corrected'  " +
                        " group by r.id_prova  " +
                    " ) provas on provas.id_aluno = a.id_aluno  " +
                    " where uc.preferencial = 1 and uc.id_professor = @idProfessor" +
                    " group by a.turma " 
    
    return Query.run(query, {idProfessor: idProfessor})
}

Metrica.getAverageByCategoriaFromCoordenador = function(idProfessor) {
    var query = " select c.id_categoria, max(c.nome) categoria, avg(redacoes.nota * 10.0 / redacoes.nota_maxima) media   " +
                " from prova r   " +
                " left join categoria_prova c on c.id_categoria = r.id_categoria   " +
                " inner join (   " +
                    " select r.id_prova, max(r.id_aluno) id_aluno, max(a.id_unidade) id_unidade, max(r.id_proposta) id_coletanea, sum(rc.notaparcial) nota, sum(c.nota_total) nota_maxima   " +
                    " from prova r   " +
                    " left join resultado_criterio rc on rc.id_prova = r.id_prova   " +
                    " left join criterio c on c.id_criterio = rc.id_criterio   " +
                    " left join aluno a on a.id_aluno = r.id_aluno   " +
                    " where rc.notaparcial is not null and r.estado = 'corrected'   " +
                    " group by r.id_prova   " +
                " ) redacoes on redacoes.id_prova = r.id_prova   " +
                " inner join unidade_professor uc on uc.id_unidade = redacoes.id_unidade   " +
                " where uc.preferencial = 1 and uc.id_professor =  @idProfessor   " +
                " group by c.id_categoria  " 

    return Query.run(query, {idProfessor: idProfessor})
}

module.exports = Metrica