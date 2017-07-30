const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express(); //实例化express
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('/ssl/2_njuptdocker.cn.key'),
    cert: fs.readFileSync('/ssl/1_njuptdocker.cn_bundle.crt')
};
https
    .createServer(options, app)
    .listen(8888);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.all('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body)
    next();
});
app.use('/api',require('./router/index'));