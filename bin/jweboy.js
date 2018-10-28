#!/usr/bin/env node

const program = require('commander')
const init = require('../command/init')
const version = require('../package').version

program
  .version(version)
  .usage('<command> [option]')

program
  .command('init <project-name>')
  .description('generate a react-webpack-template  from remote github.')
  .action(init)

// 这句是关键,用来将Program写入到命令行
program.parse(process.argv)

// 不带任何参数的默认命令会显示help信息
if(!program.args.length) {
  program.help()
}
