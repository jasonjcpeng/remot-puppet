const shell = require("shelljs");
module.exports =({cmd=[],exeFunc})=>{
  if(cmd.length>0){
    shell.exec(cmd.join('&&'));
  }
  exeFunc&&exeFunc(shell);
}