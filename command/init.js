const inquirer = require('inquirer')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const { spawn, execSync } = require('child_process');
const { isWindows } = require('../utils/platform');
const questions = require('./prompt');

module.exports = async function () {
  inquirer.prompt(questions)
    .then(async ({ packageManager, projectName, tempalteName }) => {
      const appName = projectName || tempalteName;
      const appPath = path.resolve(appName);
      const appFullPath = path.resolve(appPath);

      const execCmd = `git clone https://github.com/jweboy/${tempalteName}.git ${appName}`;

      console.log(`\nCreating a new project in ${chalk.green(appFullPath)}\n`);
      const spinner = ora('Downloading template').start();
      console.log('\n');

      try {
        await execSync(execCmd, { stdio: 'inherit' });

        console.log('\n');
        spinner.succeed(`Success! Created ${appFullPath}\n`);
        
        const pkgCmd = `${packageManager}${isWindows ? '.cmd' : ''}`;
        
        const childProcess = spawn(pkgCmd, ['install'], {
          stdio: 'inherit',
          cwd: appFullPath,
        });
        
        childProcess.on('close', () => {
          console.log(chalk.cyan('\nAll packages have been installed.\n'));
          console.log(`Now you can ${chalk.cyan(`cd ${appFullPath}`)} and ${chalk.cyan(`${packageManager} start`)}.\n`);
          console.log(chalk.cyan('Enjoy coding~\n'));
        });

      } catch (err) {
        console.log(chalk.red(err));
        process.exit();
      }
    })
}
