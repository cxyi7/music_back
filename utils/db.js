// conf/db.js
// MySQL数据库联接配置
const mysql = require('mysql2');
const { globalLogger } = require('./logger');

const QUERY_ERR_RESULT = {
			code: 404,
			data: null,
			msg: '查询失败，请重新尝试！'
    }

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '127.0.0.1', // ip地址
  user: 'root', // 用户名
  password:'cxy1008611', // 密码
  database: 'test', // 数据库名称
  waitForConnections: true, // 是否等待连接
  connectionLimit: 10, // 最大连接数
  queueLimit: 0
});


const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) { 
				if (err) {
						globalLogger.error(err);
						reject(QUERY_ERR_RESULT);
					} 
          conn.execute(sql, values, (err, result) => { 
					if (err) {
						globalLogger.error(err);
						reject(QUERY_ERR_RESULT);
					}else {
					const res = JSON.parse(JSON.stringify(result));
					let data = null;
					if (res.length === 0) { // 当查询到的数组为空，表示查询成功，但没有数据
						data = {
							code: 500,
							data: null,
							msg: '未查询到数据！'
						};
					} else {
						data = {
							code: 200,
							data: res,
							msg: '已查询到数据！'
						};
					}
					resolve(data);
					data = null; // 释放data
				}
        pool.releaseConnection(conn);  // 释放连接
        }) 
      })
    })
}

module.exports = query
