const mysql = require('mysql2');
const connection = mysql.createConnection(require('./config'));
const https = require('https');
const wx_config = require('./weixinconfig');
connection.connect();
const database = {
    check: (res, code) => {
        //openid 唯一id
        getOpenid(code).then((openid) => {
            connection.query('SELECT * from `userinfo` WHERE `openid` = ? ', [openid], (err, data) => {
                if (err) 
                    return;
                if (data.length === 0) {
                    //还没有注册
                    res.json({register: false});
                    res.end();
                } else {
                    //注册了
                    //跳转到展示页面
                    res.json({info: data[0], register: true});
                    res.end();
                }
            });
        }).catch((e)=>console.log(e));

    },
    post: (res, info) => {
        const {
            weixin_code,
            id,
            name,
            sex,
            email,
            phone,
            department
        } = info;
        getOpenid(weixin_code).then((openid) => {
            connection.query('INSERT INTO `userinfo` SET `openid`=?,`id`=?,`name`=?,`sex`=?,`email`=?,`phone`=' +
                    '?,`department`=?',
            [
                openid,
                id,
                name,
                sex,
                email,
                phone,
                department
            ], (err) => {
                if (err) {
                    res.json({info: '服务器错误'});
                    res.end();
                } else {
                    res.json({info: '报名成功'});
                    res.end();
                }
            });
        }).catch(e => console.log(e));
    }
}

//用code换取openid
function getOpenid(weixin_code) {
    return new Promise((resolve) => {
        https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wx_config.appid}&secret=${wx_config.serect}&js_code=${weixin_code}&grant_type=authorization_code`, (res) => {
            res.on('data', (d) => {
                resolve(d.openid);
            });
        });
    });
}

module.exports = database;