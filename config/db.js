const mySQL = require('mysql2/promise')

const mySQLPool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'next_task4'
})

module.exports = mySQLPool;
