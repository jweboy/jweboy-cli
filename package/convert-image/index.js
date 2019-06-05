const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const gm = require('gm');
const inquirer = require('inquirer');
const chalk = require('chalk');

const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const statAsync = promisify(fs.stat);

const { rootPath } = require('../../config/paths');
const questions = require('../../prompt/convert');

/**
 * 将 SVG 图片转换为指定格式的图片并输出到指定目录
 *
 * @param {String} outDir 输出的目录
 * @param {String} suffix 图片后缀名
 */
async function covert(outDir, suffix) {
  // svg suffix
  const SVG_SUFFIX = '.svg';

  // get svg files
  const fileNames = await readdirAsync(rootPath);
  const imageFiles = fileNames
    .filter((name) => /.svg$/.test(name))
    .map((name) => {
      const [fileName] = name.split('.');
      const sourcePath = path.join(rootPath, `${fileName}${SVG_SUFFIX}`);
      const filePath = path.join(outDir, `${fileName}.${suffix.toLowerCase()}`);

      return { sourceFile: sourcePath, targetFile: filePath };
    });

  /* eslint-disable */
  // create image file
  for (const {sourceFile, targetFile} of imageFiles) {
    await fs.writeFileSync(targetFile);
    await gm(sourceFile).write(targetFile, (err) => {
        if(!err) {
          console.log(chalk.cyan(sourceFile), chalk.green(`has been converted successfully!`))
        }
    })
  }
};

// TODO: 多线程优化
module.exports = async function convertSVGToImage() {
  const { directory, suffix } = await inquirer.prompt(questions);

  // 默认 image 目录
  const defaultDir = path.join(rootPath, "image");
  const outDir = directory || defaultDir

  try {
    // check dir is exist
    await statAsync(outDir);
    covert(outDir, suffix);
  } catch (err) {
    // catch error with 'dir is not exist'
    if (err.code === "ENOENT") {
      await mkdirAsync(outDir);
      covert(outDir, suffix);
    }
  }
};
