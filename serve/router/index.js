const router = require('express').Router();
const code2openid = require('../code2openid');
const User = require('../mysql');
const random = require('../createRandom');
const cache = require('../cache');
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
        session
    } = req.body;
    //查找session是否有效
    cache.get(session, (err, value) => {
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
router.get('/all', (req, res) => {
    User
        .all()
        .then(data => {
            res.json({status: 'ok', data});
        })
        .catch(e => res.json({status: 'error', message: e.message}));

})
module.exports = router;