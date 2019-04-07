#!/usr/bin/env node

const program = require('commander');
const init = require('../command/init');
const version = require('../package.json').version;
// const convertSVGToImage = require('../package/svg-to-image');
const deploy = require('../package/deploy');

program
  .version(version, '-v, --version')
  .usage('<command> [option]')
  .option('init', 'Generate a template  from remote github.', init)
  // .option('-s, --sharp', 'Covert svg to png', convertSVGToImage)
  .option('-d, --deploy', 'Deploy static website to server', deploy)
  .parse(process.argv); // 将Program写入到命令行


// process.on('unhandledRejection', (err) => {
//   throw err;
// });