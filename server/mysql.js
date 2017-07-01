const mysql = require('mysql2');
const connection = mysql.createConnection(require('./config'));
connection.connect();
const database = {
    check: (res,id) =>{
        //weixin id weixin 唯一id
        connection.query('SELECT * from `userinfo` WHERE `id` = ? ',[id],(err,data)=>{
            if (err) return;
            if (data.length === 0){
                //还没有注册
                res.json({
                    register:false
                });
                  res.end();
            }
            else {
                //注册了
                res.json({
                    info: data[0],
                    register:true,
                });
                 res.end();
        }
        }
        );
    },

    post: (res,info) =>{
        const {
            weixin_id,
            id,
            name,
            sex,
            email,
            phone,
            department
        } = info;

        connection.query('INSERT INTO `userinfo` SET `weixin_id`=?,`id`=?,`name`=?,`sex`=?,`email`=?,`phone`=?,`department`=?',
        [weixin_id,id,name,sex,email,phone,department],
        (err)=>{
            if (err) {
                res.json({info:'服务器错误'});
                res.end();
            }
            else {
                res.json({info:'报名成功'});
                res.end();
            }
        })
    }
}
module.exports = database;