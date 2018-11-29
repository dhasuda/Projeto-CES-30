var Query = require('../utils/query')

var Prova = function(data) {
    this.data = data
}

Prova.prototype.data = {}

Prova.savePackage = function(id) {
    var query = ''

    commonData.categorias.forEach(categoria => {
        students.forEach(function(student) {
            const singleQuery = `INSERT INTO prova (estado, datahora_criacao, datahora_validade, arquivo, pacote, id_aluno, id_professor, id_categoria, id_coletanea, semana) ` + 
                `VALUES ('${commonData.estado}', '${commonData.datahora_criacao}', '${commonData.datahora_validade}', '${commonData.arquivo}', ` +
                `'${commonData.pacote}', ${student}, ${commonData.rm_coordenador}, ${categoria}, ${commonData.id_coletanea}, '${commonData.semana}'); `

            query += singleQuery
        })
    })
    
    return Query.run(query)
}

module.exports = Prova