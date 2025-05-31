const mySQL = require('mysql2/promise')
const dotenv = require('dotenv');
dotenv.config();
const mySQLPool = mySQL.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db',
})

module.exports = mySQLPool;
