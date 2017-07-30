const Sequelize = require('sequelize');
const {database, username, password, host} = require('./config');
const sequelize = new Sequelize(database, username, password, {host, dialect: 'mysql'});
const User = sequelize.define('userinfo', {
    id: Sequelize.STRING,
    name: Sequelize.STRING, //用户名
    openid: Sequelize.STRING, //微信openid
    sex: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    department: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = User;