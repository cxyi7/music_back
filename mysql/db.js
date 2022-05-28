// conf/db.js
// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'research',
    port: 3306
  }
};


// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});