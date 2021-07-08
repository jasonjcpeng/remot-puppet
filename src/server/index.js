
const pm2Manager = require("./modules/pm2");
const chalk = require("chalk"); //正确设定终端的字符样式


module.exports =  {
    start:(params)=>{
       pm2Manager.start(params,(token)=>{
        console.log(`${chalk.cyan('【Remot Puppet】')}服务启动在${chalk.cyan(params.port)}端口`);
        console.log(`${chalk.cyan('【Remot Puppet】')}token为${chalk.cyan(token)}请妥善保存`);
       })
    },
    reStart:()=>{
      pm2Manager.reStart(()=>{
        console.log(`${chalk.cyan('【Remot Puppet】')}服务重启完成`);
      });
   },
    delete:()=>{
      pm2Manager.delete(()=>{
        console.log(`${chalk.cyan('【Remot Puppet】')}服务进程已删除`);
      })
   },
}