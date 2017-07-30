const https = require('https');
const {wxid, secret} = require('./config');
function code2openid(code) {
    return new Promise((resolve,reject) => {
        https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wxid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, (res) => {
            let data = '';
            res.on('data',(chunk) =>{
                data += chunk;
            });
            res.on('end',()=>{
                let parse = JSON.parse(data);
                if (parse.openid!==undefined){
                                    resolve(parse.openid);
                }
                else{
                    reject(parse.errmsg)
                }
            });
        });
    });
}
module.exports = code2openid;