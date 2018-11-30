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

Prova.findByStateAndCoordenador = function(professorId, states) {
    const query = " SELECT R.id_prova id, R.semana semana, CASE WHEN R.estado='not submitted' THEN 'Prova Não Submetida' WHEN R.estado='not corrected' THEN 'Prova Submetida, Não Corrigida' WHEN R.estado='in correction' THEN CASE WHEN R.dados_correcao IS NULL THEN 'Correção Não Iniciada' ELSE 'Correção em Andamento' END WHEN R.estado='corrected' THEN 'Prova Corrigida' WHEN R.estado='published' THEN 'Prova Publicada aos Alunos' WHEN R.estado='returned' THEN 'Prova Retornada' END estado, R.datahora_validade validade_raw,   " +
                        " FORMAT(R.datahora_validade, 'dd/MM/yyyy HH:mm:ss') prova_validade,   " +
                        " FORMAT(R.datahora_submissao, 'dd/MM/yyyy HH:mm:ss') prova_submissao,   " +
                        " A.id_aluno aluno,   " +
                        " A.nome nome_aluno,   " +
                        " A.turma turma,   " +
                        " CR.nome categoria,   " +
                        " C.nome coletanea, C.id_proposta id_coletanea,   " +
                        " R.pacote pacote   " +
                    " FROM prova R  " +
                    " LEFT OUTER JOIN aluno A ON R.id_aluno = A.id_aluno " +
                    " LEFT OUTER JOIN categoria_prova CR ON R.id_categoria = CR.id_categoria  " +
                    " LEFT OUTER JOIN proposta C ON R.id_proposta = C.id_proposta   " +
                    " WHERE R.estado IN ('not submitted', 'not corrected') AND   " +
                        " R.id_professor = 1   " +
                    " ORDER BY len(R.semana) DESC, R.semana DESC "
    
    return Query.run(query, {
        professorId: professorId,
        states: states
    })
}

module.exports = Prova