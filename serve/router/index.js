const router = require('express').Router();
const code2openid = require('../code2openid');
const User = require('../mysql');
router.get('/', (req, res) => {
    res.end('hello')
});
router.post('/post', (req, res) => { //提交登陆信息过来
    const {
        id,
        department,
        name,
        sex,
        phone,
        email,
        code
    } = req.body;
    code2openid(code).then(openid => {
        //查找是否存在
        User
            .find({where: {
                openid
            }})
            .then(data => {
                if (data === null) {
                    //不存在创建一个
                    User
                        .create({
                        id,
                        department,
                        name,
                        sex,
                        phone,
                        email,
                        openid
                    })
                        .then(ok => res.json({status: 'ok'}))
                        .catch(e => res.json({status: 'error', message: e}));
                } else {
                    //存在，更新
                    User.update({
                        id,
                        department,
                        name,
                        sex,
                        phone,
                        email
                    }, {where: {
                                openid
                            }})
                        .then(ok => res.json({status: 'ok'}))
                        .catch(e => res.json({status: 'error', message: e}));
                }
            })
            .catch(e => res.json({status: 'error', message: e}));

    }).catch(e => res.json({status: 'error', message: e}));
})
module.exports = router;