// const inquirer = require('inquirer')
// module.exports = async function() {
//   const tplName = await inquirer('template name:');
//   console.log(tplName);
// }
// const prompt = require('co-prompt')
// const co = require('co')
const path = require('path')
const ora = require('ora')
const util = require('util')
const chalk = require('chalk')
const exec = util.promisify(require('child_process').exec)
// const spawn = require('cross-spawn')

const gitRepo = 'https://github.com/jweboy/react-webpack-toolkit.git'

module.exports = async function (appName) {
  // co(function *() {
  //   // const tplName = yield prompt('Template name:')
  //   // console.log(tplName);
  //   // process.exit();
  // })
  console.log(`Creating a new app in ${chalk.green(path.resolve(appName))}\n`)

  let gitCmdStr = `git clone --depth=1 ${gitRepo} ${appName} && cd ${appName}`
  const spinner = ora('downloading template\n').start()

  try {
    await exec(gitCmdStr)
    spinner.stop()
    console.log(`Success! Created ${appName} at ${path.resolve(appName)}\n`)
    console.log('I suggest that you begin by typing:\n')
    console.log(chalk.cyan('cd'), appName)
    console.log(chalk.cyan('yarn install'))
    console.log(chalk.cyan('yarn start'))
  } catch (err) {
    console.log(chalk.red(err))
    process.exit()
  }
}
