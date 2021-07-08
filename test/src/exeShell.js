const path = require("path");
const shell = require(path.resolve('./src/server/modules/exeShell.js'));


describe('exeShell', function() {
  describe('# shell({cmd})',async function() {
    it('- 应该有cmd hello打印在控制台',function() {
      const cmd = [
        'cd ../',
        'echo cmd hello'
      ]
      shell({cmd});
    });
  });

  describe('# shell({exeFunc})',async function() {
    it('- 应该有exeFunc hello打印在控制台',function() {
      const exeFunc = (shellJs)=>{
        shellJs.echo('exeFunc hello')
      }
      shell({exeFunc});
    });
  });

  describe('# shell({exeFunc,cmd})',async function() {
    it('- 应该同时有cmd hello 及 exeFunc hello打印在控制台',function() {
      const exeFunc = (shellJs)=>{
        shellJs.echo('exeFunc hello')
      }
      const cmd = [
        'cd ../',
        'echo cmd hello'
      ]
      shell({cmd,exeFunc});
    });
  });
});
