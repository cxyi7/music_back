const sql = require('./sql');
const query = require('../../utils/db');
const { setToken } = require('../../utils/token');
const { globalLogger } = require('../../utils/logger');
const { encrypt, decrypt } = require('../../utils/crypto');

async function getInfo (req, res, next) {
	
}