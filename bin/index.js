#!/usr/bin/env node
const path = require("path");
const inquirer = require("inquirer"); // 通用交互式命令行用户界面的集合
const chalk = require("chalk"); //正确设定终端的字符样式
const figlet = require("figlet"); // 使用普通字符制作大字母的程序

const server = require(path.resolve('./src/server/index.js'))

const run = async ()=>{
    // 展示介绍
    init();
    // 询问问题
    askQuestions();
    
}

const init = ()=>{
  const info = chalk.cyan(
    figlet.textSync("Remot Puppet CLI", {
      font: "Big",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  )
  console.log(info);
}

const askQuestions = async () => {
  const Q1 ={
    q:[
      {
        name: "do",
        type: "list",
        choices:[{name:'启动服务',value:'start'},{name:'重启服务',value:'reStart'},{name:'结束服务',value:'delete'}],
        message: "要做些什么？"
      }
    ],
    a:async (Q1A)=>{
      switch (Q1A.do) {
        case 'start':
          const q = [
              {
                name: "port",
                type: "input",
                default:7788,
                message: "设置服务监听端口:"
              },
              {
                name: "token",
                type: "input",
                message: "设置对等token(传空则由Remot Puppet自动生成并打印到控制台):"
              }
           ]
          const qa = await inquirer.prompt(q);
          server.start(qa);
          break;
        case 'reStart':
          server.reStart();
          break;
        default:
          server.delete();
          break;
      }
    }
  }
  
  const Q1A = await inquirer.prompt(Q1.q);
  Q1.a(Q1A);
};

run();