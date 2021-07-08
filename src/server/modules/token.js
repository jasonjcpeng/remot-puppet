const crypto = require('crypto')

module.exports = {
  makeRandomToken(){
    const random = crypto.createHash('sha256').digest('hex')
    const cert = crypto.createHmac('sha256', random).digest('base64');
    return cert;
  },

  // 生成公钥私钥
  generateKey(){
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
      },
      privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
      }
     });
    return { publicKey:publicKey, privateKey:privateKey }
  },

  publicKeyEncode({publicKey,data}){
    return crypto.publicEncrypt(publicKey,Buffer.from(data)).toString('base64')
  },

  privateKeyDecode({data,privateKey}){
    let result = '';
    const deCode = crypto.privateDecrypt(privateKey,Buffer.from(data.toString('base64'), 'base64')).toString();
    try {
      result = JSON.parse(deCode)
    } catch (error) {
      result = deCode
    }
    return  result;
  }
}