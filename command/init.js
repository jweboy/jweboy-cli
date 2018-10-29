const inquirer = require('inquirer')
const path = require('path')
const ora = require('ora')
const util = require('util')
const chalk = require('chalk')
const exec = util.promisify(require('child_process').exec)
const spawn = require('child_process').spawn;

const gitRepo = 'https://github.com/jweboy/react-webpack-toolkit.git'

const questions = [{
  name: 'pkgMgr',
  type: 'list',
  message: 'Use yarn or npm',
  choices: ['yarn', 'npm']
}];

module.exports = async function (appName) {
  inquirer.prompt(questions)
    .then(async (answers) => {
      const appFullPath = path.resolve(appName)
      const gitCmd = `git clone ${gitRepo} ${appName}`
      const { pkgMgr } = answers

      console.log(`Creating a new app in ${chalk.green(path.resolve(appFullPath))}\n`)
      const spinner = ora('downloading template\n').start()
      try {
        await exec(gitCmd)
        spinner.stop()
        console.log(`Success! Created ${appName} at ${appFullPath}\n`)
        // 排除windows的怪胎行为
        const isWin = /^win/.test(process.platform)

        const pkgCmd = spawn(`${pkgMgr}${isWin && '.cmd'}`, ['install'], {
          stdio: 'inherit',
          cwd: appFullPath
        })
      
        pkgCmd.on('close', () => {
          console.log(chalk.cyan('\nAll packages have been installed.\n'))
          console.log(`Now you can ${chalk.cyan(`cd ${appFullPath}`)} and ${chalk.cyan(`${pkgMgr} start`)}.\n`) 
          console.log(chalk.cyan('Enjoy coding~\n'))
        })
      } catch (err) {
        console.log(chalk.red(err))
        process.exit()
      }
    })
}
