const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require('./constant');

// 封装了生成token值的方法  token值有效时间为4h
// token值中不能保存敏感信息
// 使用了用户id作为token值,最大程度上减少信息的泄露
module.exports = {
  setToken(u_id) {
    return new Promise((resolve,reject) => {
      const rule = {u_id}
      const settoken = jwt.sign(rule, TOKEN_SECRET_KEY, { expiresIn: '4h' })
      resolve(settoken)
    })
  }
}
