var sql = require('mssql')
const config = {
    user: 'slam',
    password: '1234',
    server: 'DESKTOP-T3QIDDH\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    database: 'TEST',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}
var cp = new sql.ConnectionPool(config); //cp = connection pool

module.exports = cp;