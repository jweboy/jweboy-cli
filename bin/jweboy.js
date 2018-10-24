#!/usr/bin/env node

const program = require('commander')
const init = require('../command/init')

program
  .version(require('../package').version)
  .usage('<command> [option]')

program
  .command('init <project-name>')
  .description('generate a project from remote template.')
  .action(init)

// 这句是关键,用来将Program写入到命令行
program.parse(process.argv)
