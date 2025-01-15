const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = pool;
