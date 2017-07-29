const router = require('express').Router();
router.get('/',(req,res)=>{
    res.end('hello')
});
router.post('/post',(req,res) =>{
    console.log(res.body);
    res.json({status:'ok'})
})
module.exports = router;