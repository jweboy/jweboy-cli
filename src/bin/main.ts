#!/usr/bin/env node

/*
 * @Author: jweboy
 * @Date: 2019-12-11 10:31:05
 * @LastEditors: jweboy
 * @LastEditTime: 2021-05-07 23:40:09
 */

import { program } from 'commander';
import build from '../lib/build';
// import { version } from '../../package.json';
import dev from '../lib/dev';
// import { SCAFFOLD_NAME } from '../constants';

// program.version(`${SCAFFOLD_NAME} ${version}`, '-v --version', '脚手架版本号').usage('<command> [options]');

program
  .command('dev')
  .description('start dev server')
  .action(dev);

program
  .command('build')
  .description('start build bundle')
  .action(build);

program.parse(process.argv);

// 不带任何参数就输出脚手架的帮助信息
if (!program.args.length) program.help();

process.on('unhandledRejection', (err) => {
  // console.log(err.stack)
  throw err;
});
