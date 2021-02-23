const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const path = require('path');
const questions = require('../../prompt/deploy');

const DOCKERFILE = 'Dockerfile';
const statAsync = util.promisify(fs.stat);

async function deployProjectToServer() {
  // 前置条件 检查 Dockerfile 是否存在
  const rootPath = process.cwd();
  const names = fs.readdirSync(rootPath);
  if (!names.includes(DOCKERFILE)) {
    return console.log('Missing Dockerfile.');
  }

  const dockerFilePath = path.join(rootPath, DOCKERFILE);
  const stat = await statAsync(dockerFilePath);
  if (!stat.isFile()) {
    return console.log('Dockerfile is not a file.');
  }

  return inquirer.prompt(questions).then((data) => {
    const { imageName } = data;
    console.log(imageName);
  });
}

module.exports = deployProjectToServer;
