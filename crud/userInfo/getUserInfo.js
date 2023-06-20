const sql = require('./sql');
const query = require('../../utils/db');
const { globalLogger } = require('../../utils/logger');


const USERINFO_OK = {
  code: 200,
  data: null,
  msg: '数据正确匹配，返回token值'
}


async function getInfo(req,res,next) {
  console.log(req.session.code, 'req.session');
  // const reqBody = req.body
  // const ip = req.ip
  // const info = await query(sql.query,[reqBody.username]) // 获取的数据中data是加密了的
  // const data = info.data 
}
