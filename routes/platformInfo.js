const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
  console.log(req.session.code, 'req.session.code');
  // next()
  // res.send('xxx')
  next()
})

router.get('/user/profile', function(req, res, next) {
  res.send({
    code: 200,
    data: {},
    msg: '操作成功!'
  })
})

router.get('/menu/getRouters',function (req,res,next) {
  res.send({
    code: 200,
    data: {},
    msg: '操作成功!'
  })
})

module.exports = router;
