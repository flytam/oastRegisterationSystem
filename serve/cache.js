//用于缓存登陆状态
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 60*60, checkperiod: 120 } );
module.exports = myCache;