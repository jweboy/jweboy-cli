import { realpathSync } from 'fs';
import { join } from 'path';

/**
 * @param {string} relativePath 文件相对路径
 * @returns 基于根目录的完整文件绝对路径
 */
export const getRuntimeProjectPath = (path: string, rootPath: string = process.cwd()) => {
  const appPath = realpathSync(rootPath);
  const fullPath = join(appPath, path);

  return fullPath;
};
