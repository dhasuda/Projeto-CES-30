function isInteger(f) {
    return typeof(f)==="number" && Math.round(f) == f;
}
function isFloat(f) { return typeof(f)==="number" && !isInteger(f); }

Query = {}

Query.execute = function(query, param, onSuccess, onError) {
    const req = global.conn.request()

    var parseType = function(value) {
        if(isFloat(value)) return global.sql.Float
        return global.sql.NVarChar
    }

    for(k in param) {
        if(Array.isArray(param[k])) {
            if(param[k].length == 0) {
                query = query.replace('@' + k, 'null')
            } else {
                final = (param[k].map((it, i) => '@' + k + i)).join(', ')
                query = query.replace('@' + k, final)

                param[k].forEach((it, i) => {
                    req.input(k + i, parseType(it), it)
                })
            }
        } else {
            req.input(k, parseType(param[k]), param[k])
        }
    }

    req.query(query, (err, result) => {
        if(err) onError(err)
        else onSuccess(result)
    })
}

Query.run = function(query, param){
    return new Promise((resolve, reject) => {
        if(param == undefined) param = {}
        Query.execute(query, param, result => resolve(result.recordset), reject)
    })
} 

Query.getScopeIdentity = function (onSuccess, onError) {
    global.conn.request()
        .query("SELECT SCOPE_IDENTITY() id", function (err, result) {
            if (err) {
                onError(err)
            } else {
                onSuccess(result)
            }
        })
}

module.exports = Query