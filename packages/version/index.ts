import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import questions from './question';
import { VersionType } from './typings';

// https://semver.org/lang/zh-CN/

export function syncUpdateVersion(version: string, type: VersionType) {
  let [major, minor, patch] = version.split('.').map((str) => +str);

  // 每当主版本号递增时，次版本号和修订号必须归零
  if (type === VersionType.Major) {
    major += 1;
    minor = 0;
    patch = 0;
  }

  // 每当次版本号递增时，修订号必须归零。
  if (type === VersionType.Minor) {
    minor += 1;
    patch = 0;
  }

  // 每当次版本号递增时，修订号必须归零。
  if (type === VersionType.Patch) {
    patch += 1;
  }

  return [major, minor, patch].join('.');
}

async function generateVersion() {
  inquirer.prompt(questions).then((data) => {
    const packagePath = path.resolve('package.json');

    // 需要读取的文档流
    const readStream = fs.createReadStream(packagePath);

    let newChunk = '';

    readStream.on('data', (chunk) => {
      const packages = JSON.parse(chunk.toString());

      // @ts-ignore
      packages.version = syncUpdateVersion(packages.version, data.versionCode);

      newChunk = JSON.stringify(packages, null, 2);
    });

    readStream.on('end', async () => {
      await fs.promises.writeFile(packagePath, newChunk);
      console.log(chalk.cyan('文件版本修改完成~'));
    });
  });
}

generateVersion();

module.exports = generateVersion;
