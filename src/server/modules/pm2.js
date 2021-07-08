const pm2 = require('pm2');
const tokenGenerator = require('./token');

module.exports = {
  start(params,done){
    pm2.connect(function(err) {
      if (err) {
        console.error(err)
        pm2.disconnect()
      }
      // 生成token签名
      const token = params.token || (()=>{
        const resToken = tokenGenerator.makeRandomToken();
        return resToken;
      })();
      pm2.start({
        script    : 'src/server/modules/server.js',
        name      : 'remot-puppet',
        env:{
          PARAMS:JSON.stringify(Object.assign({},params,{token}))
        }
      }, function(err, apps) {
        pm2.disconnect()
        if (err) {
          console.error(err)
        }else{
          done&&done(token);
        }
      })
    })
  },
  
  reStart(done){
    pm2.connect(function(err) {
      if (err) {
        console.error(err)
        pm2.disconnect()
      }
    
      pm2.list((err, list) => {
        pm2.restart('api', (err, proc) => {
          // Disconnects from PM2
          pm2.disconnect()
          done&&done();
        })
      })
    })
  },

  delete(done){
    pm2.connect(function(err) {
      if (err) {
        console.error(err)
        pm2.disconnect()
      }
      pm2.delete('remot-puppet',()=>{
        pm2.disconnect()
        done&&done();
      })
    })
  }
}