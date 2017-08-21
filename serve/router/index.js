const router = require('express').Router();
const code2openid = require('../code2openid');
const User = require('../mysql');
const random = require('../createRandom');
const cache = require('../cache');
const nodeExcel = require('excel-export');
const uuid = require('node-uuid');
router.get('/', (req, res) => {
    res.end('hello')
});
router.post('/code2openid', (req, res) => {
    //用code换取openid并返回签名
    const {code} = req.body;
    code2openid(code).then(data => {
        const {openid} = data;
        //存到缓存中
        random().then(key => {
            cache.set(key, openid, (err, success) => {
                if (err) {
                    res.json({status: 'error', message: err})
                } else {
                    res.json({status: 'ok', session: key})
                }
            })
        }).catch(e => res.json({status: 'error', message: e.message}))
    }).catch(e => res.json({status: 'error', message: e.message}));
})
router.post('/post', (req, res) => { //提交登陆信息过来
    const {
        id,
        department,
        name,
        sex,
        phone,
        email,
        code,
        session //签名的第三方session
    } = req.body;
    //查找session是否有效
    cache.get(session, (err, value) => { //这个value是openid
        if (err) {
            res.json({status: 'ok', message: err})
        } else {
            if (value == undefined) {
                //不存在该Session重新登陆
                res.json({status: 'error', message: 'not fonund'})
            } else {
                //有效存数据库 是否存在查找，不存在就创建
                User
                    .find({
                    where: {
                        openid: value
                    }
                })
                    .then(data => {
                        if (data === null) {
                            User
                                .create({
                                id,
                                department,
                                name,
                                sex,
                                phone,
                                email,
                                openid: value
                            })
                                .then(ok => res.json({status: 'ok'}))
                                .catch(e => res.json({status: 'error', message: e.message}))
                        } else {
                            User.update({
                                id,
                                department,
                                name,
                                sex,
                                phone,
                                email
                            }, {
                                    where: {
                                        openid: value
                                    }
                                })
                                .then(ok => res.json({status: 'ok'}))
                                .catch(e => res.json({status: 'error', message: e}));
                        }
                    })
                    .catch(e => res.json({status: 'error', message: e.message}));

            }
        }
    })
})
router.get('/info', (req, res) => { //根据session查询的用户信息
    const {session} = req.query;
    cache.get(session, (err, value) => {
        if (err) {
            res.json({status: 'error', message: err.message})
        } else {
            User
                .findOne({
                where: {
                    openid: value
                }
            })
                .then(data => {
                    if (data === null) {
                        res.json({status: 'none'})
                    } else {
                        res.json({status: 'ok', data})
                    }
                })
                .catch(e => res.json({status: 'error', message: e.message}))
        }
    })
})
router.get('/test', (req, res) => { //测试接口
    const {openid} = req.query;
    
            User
                .findOne({
                where: {
                    openid
                }
            })
                .then(data => {
                    if (data === null) {
                        res.json({status: 'none'})
                    } else {
                        res.json({status: 'ok', data})
                    }
                })
                .catch(e => res.json({status: 'error', message: e.message}))
        

})
router.get('/all', (req, res) => {
    User
        .all()
        .then(data => {
            res.json({status: 'ok', data});
        })
        .catch(e => res.json({status: 'error', message: e.message}));

})
router.get('/excel',(req,res) =>{
    //导出excel表格数据打印
    const {department} = req.query;//打印哪个部门
    let dep;
    switch(department){
        case 'computer':
        dep='计算机部';
        break;
        case 'support':
        dep='技术支持中心';
        break;
        case 'ele':
        dep = '电子部';
        break;
        default:
        return;
    }
    const conf={};
    //每一列的表头
    conf.cols=[{
        caption:'序号',
        type:'number'
    },{
        caption:'学号',
        type:'string'
    },{
        caption:'姓名',
        type:'string'
    },{
        caption:'性别',
        type:'string'
    },{
        caption:'邮箱',
        type:'string'
    },{
        caption:'手机号',
        type:'string'
    },{
        caption:'部门',
        type:'string'
    }];
    User.findAll({where:{
        department:dep
    }}).then(data =>{
        //每一行的数据
        
        conf.rows = data.map((item,index) =>{
         return [index+1,item.id,item.name,item.sex,item.email,item.phone,item.department]   
        });
        const result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", `attachment; filename=${department}.xlsx`);
        res.end(result, 'binary');
    }).catch(e =>res.json({status:'error',message:e.message}));
    
})
module.exports = router;