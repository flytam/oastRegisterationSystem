var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const database = require('../mysql');

//查询是否已经注册
router.get('/check', (req,res) =>{
  const code = req.query.code;
  database.check(res,code);
});


//还没有注册的提交或者已经注册的修改
router.post('/post',(req,res) =>{
  const info = req.body;
  console.log('body',req.body)
  database.post(res,info);
});
module.exports = router;
