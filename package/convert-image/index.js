const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const gm = require("gm");
const inquirer = require("inquirer");

const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const statAsync = promisify(fs.stat);

const { rootPath } = require("../../config/paths");
const questions = require("../../prompt/convert");

/**
 * 将 SVG 图片转换为指定格式的图片并输出到指定目录
 *
 * @param {String} outDir 输出的目录
 * @param {String} suffix 图片后缀名
 */
async function covert(outDir, suffix) {
  // get svg files
  const files = await readdirAsync(rootPath);
  const svgFiles = files.filter(name => /.svg$/.test(name));

  // get image files
  const imgFiles = svgFiles.reduce((arr, name) => {
    const [fileName] = name.split(".");
    const filePath = path.join(outDir, `${fileName}${suffix}`);
    arr.push(filePath);
    return arr;
  }, []);
  console.table(imgFiles);

  /* eslint-disable */
  // create images
  for (const image of imgFiles) {
    await fs.writeFileSync(image);
  }

  // covert svg to image
  for (const svgFile of svgFiles) {
    const [fileName] = svgFile.split(".");
    const inputFile = path.join(rootPath, svgFile);
    const outFile = path.join(outDir, `${fileName}${suffix}`);

    await gm(inputFile)
      .write(outFile, (err) => {
        if(err) {
          throw err
        }
      })
  }
};

// TODO: 代码优化
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
