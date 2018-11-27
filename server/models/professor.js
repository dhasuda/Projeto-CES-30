var Query = require('../utils/query')
var Professor = {}

Professor.createNewProfessor = (name, username, password) => {
    var query = " insert into professor (nome, usuario, senha) values (@name, @username, @password) " +
                " select * from professor "
    
    return Query.run(query, {name: name, username: username, password: password})
}

Professor.findByUsername = (username) => {
    var query = 'select * from professor where usuario = @username'
    return Query.run(query, {username: username})
}

module.exports = Professor