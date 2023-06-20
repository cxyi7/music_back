const express = require('express');
const router = express.Router();

const login = require('../crud/token/getToken')


router.use((req,res,next) => {
  console.log('Time: ',Date.now())
  next()
})

/*  users listing. */
router.post('/login',async function (req,res,next) {
  await login.verify(req, res, next)
});

// router.get('/logout',function (req,res,next) {
//   console.log(req,'req');
// })

module.exports = router;
