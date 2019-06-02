// const Git = require("nodegit");
const ora = require("ora");
const chalk = require("chalk");
const { spawn, execSync } = require("child_process");
const { isWindows } = require("./platform");

const GITHUB_URL = "https://github.com/jweboy";

/**
 * 下载 GitHub 指定项目文件
 * @param {String} tempalteName 需要下载的模版项目名称
 * @param {String} projectName 新创建的项目目录名称
 * @param {String} appFullPath 新创建项目的完整文件路径
 * @param {String} packageManager 指定的包管理器 => ['npm', 'yarn']
 */
async function donwloadGithubFiles({
  tempalteName,
  projectName,
  appFullPath,
  packageManager
}) {
  const execCmd = `git clone ${GITHUB_URL}/${tempalteName}.git ${projectName}`;
  const pkgCmd = `${packageManager}${isWindows ? ".cmd" : ""}`;
  const spinner = ora().start();

  console.log(`\n Creating a new project in ${chalk.green(appFullPath)}\n`);

  await execSync(execCmd, { stdio: "inherit" });

  console.log("\n");
  spinner.succeed(`Success! Created ${appFullPath}\n`);
  console.log("Installing packages. This might take a couple of minutes.\n");

  const childProcess = spawn(pkgCmd, ["install"], {
    stdio: "inherit",
    cwd: appFullPath
  });

  childProcess.on("close", () => {
    console.log(chalk.cyan("\n All packages have been installed.\n"));
    console.log(
      `Now you can ${chalk.cyan(`cd ${appFullPath}`)} and ${chalk.cyan(
        `${packageManager} start`
      )}.\n`
    );
    console.log(chalk.cyan("Enjoy coding~\n"));
  });
}

module.exports = donwloadGithubFiles;
