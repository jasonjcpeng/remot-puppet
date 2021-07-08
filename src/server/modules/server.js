const Koa = require('koa');
const tokenGenerator = require('./token');
const shell = require('./exeShell.js');
const app = new Koa();
const params = JSON.parse(process.env.PARAMS||'{}')
const bodyParser = require("koa-bodyparser");

// 生成并保存公私钥token
app.context.__ext =Object.assign({},params,tokenGenerator.generateKey())

app.use(bodyParser());

app.use(async ctx => {
  switch (ctx.request.method) {
    case 'POST':
      let result = {};
      try {
        result = tokenGenerator.privateKeyDecode({
          privateKey:ctx.__ext.privateKey,
          data:ctx.request.body.data
        })
      } catch (error) {
        ctx.throw(500);
      }
      if(result.token!==ctx.__ext.token){
        ctx.throw(500);
      }
      shell({cmd:result.cmd});
      ctx.body = 'ok';
      break;
    default:
      ctx.body = ctx.__ext.publicKey;
      break;
  }
});

app.listen(params.port||7788);
