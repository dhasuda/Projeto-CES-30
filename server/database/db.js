const sql = require('mssql')

// // Global connection
module.exports = {
    connect: (connStr, done) => {
        var conn = new sql.ConnectionPool(connStr)
        conn.connect().then(conn => { 
            if(conn != undefined){
                global.conn = conn;
                global.sql = sql;
                console.log('Connection Estabilished')
            }else{
                console.log('Undefined connection');
            }

            if(done) done()
        }).catch(err => {
            console.log(err)
            
            if(done) done()
        })
        conn.on('error', err => {
            console.log('Problem on Establishing Connection', err);
        });
    }
}