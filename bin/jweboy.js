#!/usr/bin/env node

const program = require('commander');
// const convertImage = require('../packages/convert-image');
const initTemplate = require('../packages/template');
const deployStatic = require('../packages/deploy-static');
const { version } = require('../package.json');

// const deploy = require("../package/deploy");

program
  .version(version, '-v, --version')
  .usage('<command> [option]')
  .option('-i, --init', '生成指定的模版，包括react模版、react-eslint模版和 eslint模版 ', initTemplate)
  .option('-d, --deploy', '部署静态资源到服务器，自动执行文件拷贝', deployStatic)
  // .option('-c, --convert', 'Covert svg to png', convertImage)
  .parse(process.argv); // 将Program写入到命令行

process.on('unhandledRejection', (err) => {
  throw err;
});
