var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const database = require('../mysql');
router.get('/check', (req,res) =>{
  const id = req.query.id;
  database.check(res,id);
});

router.post('/post',(req,res) =>{
  const info = req.body;
  console.log("213213321")
  console.log('body',req.body)
  database.post(res,info);
});
module.exports = router;
