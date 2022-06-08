const sql = require('./sql');
const query = require('../../utils/db');
const { setToken } = require('../../utils/token');
const { globalLogger } = require('../../utils/logger');
const { encrypt, decrypt } = require('../../utils/crypto');

const USER_ERROR = {
	code: 1,
	data: encrypt({}),
	msg: '输入的账号密码不匹配，请重新输入！'
}

const USER_OK = {
	code: 1,
	data: null,
	msg: '数据正确匹配，返回token值'
}

async function verify (req, res, next) {
	const reqBody = req.body
	const ip = req.ip
	const info = await query(sql.query, [reqBody.username]) // 获取的数据中data是加密了的
	const data = decrypt(info.data) // 对数据进行解密

	// 如果data为{}则表示查询失败或查询到的数据为空  此时数据都直接返回出去，表示失败
	if ( JSON.stringify(data) === '{}' ) {
		globalLogger.info(`${ip}  输入的账号不存在，返回错误！`)
		res.json(info)
	} else {
		const user = data[0]
		// 如果账号密码正确匹配，则返回加密的token值
		if (user.u_name === reqBody.username && user.u_password === reqBody.password) {
			const token = await setToken(user.u_id)
			const encrypt_token = encrypt(token)
			USER_OK.data = encrypt_token
			
			globalLogger.info(`${ip}  账号密码匹配成功，返回token值！`)

			res.json(USER_OK)
		} else {
			globalLogger.info(`${ip}  账号密码匹配失败，返回错误！`)

			// 账号密码不正确的返回值
			res.json(USER_ERROR)
		}
	}
}

module.exports = {
	verify
}