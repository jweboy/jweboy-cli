// @ts-nocheck
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sshClient = require('jweboy-ssh-client');
const dotenv = require('dotenv');
const yargs = require('yargs');
const { rootPath } = require('../../../config/paths');

const fsPromises = fs.promises;
const { argv } = yargs;

dotenv.config();

async function deployStatic() {
  let projectName = '';

  // 定义新目录名就用新名字
  if (argv.d && typeof argv.d === 'string') {
    projectName = argv.d;
  }

  if (argv.deploy && typeof argv.deploy === 'string') {
    projectName = argv.deploy;
  }

  // 目录名称为空就使用当前项目路径
  const projectPath = projectName ? path.resolve(rootPath, projectName) : rootPath;

  // TODO: 如何将这些参数提取出去
  const config = {
    host: process.env.HOST || '118.24.155.105',
    username: process.env.USERNAME || 'root',
    baseDir: process.env.BASE_DIR || 'projects',
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH || '/Users/jianglei/.ssh/id_rsa'),
  };

  try {
    await fsPromises.stat(projectPath);
    await sshClient(projectPath, config);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(chalk.red(`当前路径下不存在此目录 ${projectPath}`));
    }
  }
}

module.exports = deployStatic;
