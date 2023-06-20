const CryptoJS = require("crypto-js");
const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV } = require('./constant');

const KEY_UTF8 = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_KEY) // 十六位十六进制数作为密钥
const IV_UTF8 = CryptoJS.enc.Utf8.parse(CRYPTO_SECRET_IV) // 十六位十六进制数作为密钥偏移量

// 使用AES进行加密 --> 注意纯文本和对象的加解密方式有点点不同  以下是对象加密方式
module.exports = {
	// 对象加密
	encryptObj(msg) {
		const cipherObj= CryptoJS.AES.encrypt(JSON.stringify(msg), KEY_UTF8, {
		iv: IV_UTF8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
		return cipherObj
	},

	// 对象解密
	decryptObj(cipherObj) {
		const bytes = CryptoJS.AES.decrypt(cipherObj, KEY_UTF8, {
		iv: IV_UTF8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
	    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
		return decryptedData
	},

	// 文本解密
	decryptText(cipherText) {
		let encryptedHexStr = CryptoJS.enc.Hex.parse(cipherText);
		let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		let decrypt = CryptoJS.AES.decrypt(srcs, KEY_UTF8, {
			iv: IV_UTF8,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
		return decryptedStr.toString();
	}
}


