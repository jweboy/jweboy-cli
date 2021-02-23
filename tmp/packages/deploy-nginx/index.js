const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');
const { rootPath } = require('../../utils/path');

const outRootDir = '/Users/jianglei/LearnNginx/nginx-docker-demo';
const outStaticDir = path.join(outRootDir, 'html');

/**
 * 拷贝指定目录的所有文件至 nginx 的 html 目录中
 */
function recursiveCopyDirs() {
  const copy = spawn('cp', ['-r', rootPath, outStaticDir]);

  copy.stderr.on('data', (data) => {
    console.log(chalk.red(`copy stderr => ${data}`));
    process.exit(0);
  });

  copy.on('exit', () => {
    console.log(chalk.green('File copy completed.'));
  });
}

/**
 * 将 nginx 镜像重新打包部署到服务器并更新对应容器
 */
function deployToServer() {
  const shell = spawn('sh', ['build.sh'], { cwd: outRootDir });

  shell.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  shell.stderr.on('data', (data) => {
    console.log(chalk.red(`shell stderr => ${data}`));
    process.exit(0);
  });

  shell.on('exit', () => {
    console.log(chalk.cyan('Docker deploy completed.'));
  });
}

module.exports = function main() {
  recursiveCopyDirs();
  deployToServer();
};
