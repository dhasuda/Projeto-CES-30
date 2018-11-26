var Query = require('../utils/query')
var Professor = {}

Professor.findByUsername = (username) => {
    var query = 'select * from professor where usuario = @username'
    return Query.run(query, {username: username})
}

module.exports = Professor