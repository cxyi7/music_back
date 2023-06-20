const sql = require('./sql');
const query = require('../../utils/db');
const { setToken } = require('../../utils/token');
const { loginLogger,globalLogger } = require('../../utils/logger');
const { decryptText } = require('../../utils/crypto');

const USER_ERROR = {
	code: 500,
	data: null,
	msg: '输入的账号密码不匹配，请重新输入！'
}

const USER_OK = {
	code: 200,
	data: null,
	msg: '数据正确匹配，返回token值'
}

async function verify(req,res,next) {
	const reqBody = req.body
	const ip = req.ip

	// 验证码 验证
	if (!req.session.code) {
		globalLogger.error(`${ip}  验证码已过期！`)
		res.json({
			code: 500,
			data: null,
			msg: '验证码已过期！'
		})
		return
	}
	if (!reqBody.code) {
		globalLogger.error(`${ip}  输入的验证码不能为空！`)
		res.json({
			code: 500,
			data: null,
			msg: '输入的验证码不能为空！'
		})
		return
	}
	if (reqBody.code.toLocaleLowerCase() !== req.session.code) {
		globalLogger.error(`${ip}  输入的验证码不正确，返回错误！`)
		res.json({
			code: 500,
			data: null,
			msg: '输入的验证码不正确，请重新输入！'
		})
		return
	}

	// 查询用户信息
	const info = await query(sql.query, [reqBody.username])
	const data = info.data

	// 如果data为null则表示查询失败或查询到的数据为空  此时数据都直接返回出去，表示失败
	if ( JSON.stringify(data) === 'null' ) {
		globalLogger.error(`${ip}  输入的账号不存在，返回错误！`)
		res.json({
			code: 401,
			data: null,
			msg: '输入的账号不存在，请重新输入！'
		})
	} else {
		const user = data[0]
		// 如果账号密码正确匹配，则返回加密的token值
		if (user.u_name === reqBody.username && user.u_password === decryptText(reqBody.password)) {
			const token = await setToken(user.u_id)
			const encrypt_token = token
			USER_OK.data = {
				tokenValue: encrypt_token,
				tokenName: 'music-token',
				tokenTimeout: 400
			}
			
			loginLogger.info(`${ip}  账号密码匹配成功，返回token值！`)
			res.json(USER_OK)
		} else {
			globalLogger.error(`${ip}  账号密码匹配失败，返回错误！`)

			// 账号密码不正确的返回值
			res.json({
				code: 401,
				data: null,
				msg: '输入的账号密码不匹配，请重新输入！'
			})
		}
	}
	next()
}

module.exports = {
	verify
}
