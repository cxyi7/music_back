const express = require('express');
const router = express.Router();

const login = require('../crud/token/getToken')

/* GET users listing. */
router.post('/',async function(req, res, next) {
  // res.send('respond with a resource');
  await login.verify(req, res, next)
});

router.post('/login',async function(req, res, next) {
  await login.verify(req, res, next)
});

module.exports = router;
