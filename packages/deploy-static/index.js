// @ts-nocheck
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sshClient = require('jweboy-client');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const question = require('../../prompt/deploy_static');
const { rootPath } = require('../../config/paths');

const fsPromises = fs.promises;

dotenv.config();

async function deployStatic() {
  const { projectName } = await inquirer.prompt(question);

  // 目录名称为空就使用当前路径
  const projectPath = projectName ? path.resolve(rootPath, projectName) : rootPath;
  const config = {
    host: process.env.HOST,
    username: process.env.USERNAME,
    baseDir: process.env.BASE_DIR,
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
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
