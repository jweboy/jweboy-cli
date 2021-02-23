/*
 * @Author: jweboy
 * @Date: 2019-12-11 13:22:50
 * @LastEditors  : jweboy
 * @LastEditTime : 2020-01-20 14:55:07
 */

import { join } from 'path';
import { getRuntimeProjectPath } from '../utils/fs';

export const getPathByCurrentDirectory = (path: string) => {
  return join(__dirname, path);
};

const paths = {
  src: getRuntimeProjectPath('src'),
  dist: getRuntimeProjectPath('dist'),
  nodeModules: getRuntimeProjectPath('node_modules'),
  cliNodeModules: getPathByCurrentDirectory('../../node_modules'),
  template: getPathByCurrentDirectory('../../public/index.html'),
  errorIcon: getPathByCurrentDirectory('../../public/error.png'),
  // tsConfigFile: path.join(__dirname, './tsconfig.default.json'),
};

export default paths;
