const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 60*60, checkperiod: 120 } );



myCache.set('key','value',(err,success)=>{

myCache.get('key',(err,value) =>{
    console.log('xx',value)
})


})