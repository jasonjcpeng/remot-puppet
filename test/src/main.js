const should = require('chai').should();
const axios = require('axios');
const path = require("path");
const token = require(path.resolve("./src/server/modules/token.js"));


describe('Server', function() {
  describe('#GET Request',function() {
    it('- http://127.0.0.1:7788 返回码:200',async function() {
        const option = {
          url:'http://127.0.0.1:7788',
          method:'get'
        } 
        const result = await axios(option);
        result.status.should.equal(200);
      })
  });

  describe('#POST Request',function() {
    it('- http://127.0.0.1:7788 返回码:200',async function() {
        const cent = await axios({
          url:'http://127.0.0.1:7788',
          method:'GET'
        });


        const _data = JSON.stringify(Object.assign({cmd:[
          'cd ./test',
          `echo "${new Date()}">PostRequestTest.txt`
        ]},{token:'test'})); 

        const data = {data:token.publicKeyEncode({data:_data,publicKey:cent.data})};

        const option = {
          url:'http://127.0.0.1:7788',
          headers:{
            'Content-Type':'application/json; charset=utf-8'
          },
          data,
          method:'POST'
        } 

        const result = await axios(option);
        result.status.should.equal(200);
    });
  });
});