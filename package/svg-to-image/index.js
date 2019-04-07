const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
// TODO: sharp 安装很慢的问题
const sharp  = require('sharp');

const userDir = process.cwd();
const _readdir = promisify(fs.readdir);
const _mkdir = promisify(fs.mkdir);
const _stat = promisify(fs.stat);

// TODO: 代码优化
module.exports = async function convertSVGToImage() {
    const inputDir = userDir;
    const outDir = path.join(inputDir, 'image');
    const SUFFIX = '.png';

    // console.log(inputDir, outDir);

    const covert = async () => {
         // get svg files
         const files = await _readdir(inputDir);
         const svgFiles = files.filter(name => /.svg$/.test(name));
         
         // get image files
         const imgFiles = svgFiles.reduce((arr, name) => {
             const [fileName] = name.split('.');
             const filePath = path.join(outDir, `${fileName}${SUFFIX}`);
             arr.push(filePath);
             return arr;
         }, []);
        //  console.table(imgFiles);
 
         // create images
         for (const image of imgFiles) {
             await fs.writeFileSync(image);
         }
         
         // covert svg to image
         for (const svgFile of svgFiles) {
             const [fileName] = svgFile.split('.');
             const inputFile = path.join(inputDir, svgFile);
             const outFile = path.join(outDir, `${fileName}${SUFFIX}`);
             await sharp(inputFile).toFile(outFile);
         }
    };

    try{
        // check dir is exist
        await _stat(outDir);
        covert();
    } catch(err) {
        // catch error with 'dir is not exist'
        if(err.code === 'ENOENT') {
            await _mkdir(outDir);
            covert();
        }
    }
}


