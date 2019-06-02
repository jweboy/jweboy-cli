const fs = require("fs");
const path = require("path");
const util = require("util");
const inquirer = require("inquirer");
const chalk = require("chalk");
const questions = require("../../prompt/prompt");
const donwloadGithubFiles = require("../../utils/download-github-files");

const statAsync = util.promisify(fs.stat);

module.exports = async function initTempalte() {
  const { projectName, tempalteName, packageManager } = await inquirer.prompt(
    questions
  );

  // 项目名为空则使用默认名称
  const appName = projectName || tempalteName;
  const appPath = path.resolve(appName);
  const appFullPath = path.resolve(appPath);

  try {
    const stat = await statAsync(appFullPath);
    if (stat.isDirectory()) {
      console.log(chalk.red("Current directory already exists.\n"));
      console.log(
        chalk.red(
          "Either try using a new directory name, or remove the files listed above."
        )
      );
    }
  } catch (err) {
    donwloadGithubFiles({
      tempalteName,
      projectName,
      appFullPath,
      packageManager
    });
  }
};
