// @ts-nocheck
const { Clone } = require('nodegit');
const { spawn } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');
const { isWindows } = require('./platform');
const { GITHUB_URL, PROJECT_STARTER } = require('../contants/tempalte');

let spinner;

/**
 * 下载 GitHub 指定项目文件
 * @param {String} templateName 需要下载的模版项目名称
 * @param {String} projectName 新创建的项目目录名称
 * @param {String} appFullPath 新创建项目的完整文件路径
 * @param {String} packageManager 指定的包管理器 => ['npm', 'yarn']
 */
async function donwloadGithubFiles({ templateName, projectName, appPath, packageManager }) {
  try {
    spinner = ora().start(`Creating a new project in ${chalk.green(appPath)}`);
    await Clone.clone(`${GITHUB_URL}/${templateName}`, projectName);
    // spinner.succeed(`Success! Created ${appPath}\n`);

    console.log('\n');
    spinner.stop();
    spinner.succeed(`Success! Created ${appPath}\n`);
    console.log('Installing packages. This might take a couple of minutes.\n');

    const pkgCmd = `${packageManager}${isWindows ? '.cmd' : ''}`;
    const installProcess = spawn(pkgCmd, ['install'], {
      stdio: 'inherit',
      cwd: appPath,
    });

    installProcess.on('close', () => {
      console.log(chalk.cyan('\n All packages have been installed.\n'));
      console.log(`Now you can ${chalk.cyan(`cd ${appPath}`)} and ${chalk.cyan(`${packageManager} start`)}.\n`);
      console.log(chalk.cyan('Enjoy coding~\n'));
    });
  } catch (err) {
    spinner.stop();
    console.log(chalk.red(err.message));
  }
}

donwloadGithubFiles({
  templateName: PROJECT_STARTER,
  appPath: '/Users/jianglei/GithubProjects/jweboy-cli/sss',
  packageManager: 'npm',
  projectName: 'ab',
});

module.exports = donwloadGithubFiles;
