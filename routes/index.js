const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();
const { v5: uuidv5 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/captcha',function (req,res) {
  // req.session.captcha = captcha.text;
  const captcha = svgCaptcha.create();
  req.session.code = captcha.text.toLocaleLowerCase();
  const uuid = uuidv5('https://www.dadaguai.fun/',uuidv5.URL);

  res.type('svg');
  res.send({
    code: 200,
    msg: '操作成功！',
    data: {
      uuid,
      img: captcha.data
    }
  });
})


module.exports = router;
