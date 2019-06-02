const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const gm = require("gm");

const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const statAsync = promisify(fs.stat);

const { rootPath } = require("../../config/paths");

// TODO: 代码优化
// TODO: 多线程优化
// TODO: 多格式转换
// TODO: 输出目录名
module.exports = async function convertSVGToImage() {
  const outDir = path.join(rootPath, "image");
  const SUFFIX = ".png";

  // console.log(rootPath, outDir);

  const covert = async () => {
    // get svg files
    const files = await readdirAsync(rootPath);
    const svgFiles = files.filter(name => /.svg$/.test(name));

    // get image files
    const imgFiles = svgFiles.reduce((arr, name) => {
      const [fileName] = name.split(".");
      const filePath = path.join(outDir, `${fileName}${SUFFIX}`);
      arr.push(filePath);
      return arr;
    }, []);
    //  console.table(imgFiles);

    /* eslint-disable */
    // create images
    for (const image of imgFiles) {
      await fs.writeFileSync(image);
    }

    // covert svg to image
    for (const svgFile of svgFiles) {
      const [fileName] = svgFile.split(".");
      const inputFile = path.join(rootPath, svgFile);
      const outFile = path.join(outDir, `${fileName}${SUFFIX}`);

      await gm(inputFile)
        .write(outFile, (err) => {
          if(err) {
            throw err
          }
        })
    }
  };

  try {
    // check dir is exist
    await statAsync(outDir);
    covert();
  } catch (err) {
    // catch error with 'dir is not exist'
    if (err.code === "ENOENT") {
      await mkdirAsync(outDir);
      covert();
    }
  }
};
