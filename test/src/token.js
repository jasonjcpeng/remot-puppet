require('chai').should();
const path = require("path");
const token = require(path.resolve("./src/server/modules/token.js"));


describe('Token', function() {
  describe('#makeRandomToken',async function() {
    it('- 返回一个随机token',function() {
      const cent = token.makeRandomToken();
      cent.should.be.a('string');
    });
  });

  describe('#generateKey',async function() {
    it('- 生成公钥和私钥',function() {
      const keys = token.generateKey();
      keys.should.be.a('object');
      keys.publicKey.should.be.a('string');
      keys.privateKey.should.be.a('string');
    });
  });

  describe('#verifyCode',async function() {
    it('- 加解密',function() {
      const keys = token.generateKey();
      const cent = 'test';
      const cmd = [
        'cd ../',
        'echo cmd hello'
      ];
      const _data = JSON.stringify(Object.assign({cmd},{token:cent}));

      const data = {data:token.publicKeyEncode({data:_data,publicKey:keys.publicKey})}
      
      const result = token.privateKeyDecode({
        privateKey:keys.privateKey,
        data:data.data
      })
      JSON.stringify(cmd).should.equal(JSON.stringify(result.cmd))
      cent.should.equal(result.token);
    });
  });
});