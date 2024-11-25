const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = pool; // Export the pool for use in other parts of the application
