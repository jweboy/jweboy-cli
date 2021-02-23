/*
 * @Author: jweboy
 * @Date: 2020-01-06 10:36:54
 * @LastEditors: jweboy
 * @LastEditTime: 2020-01-06 18:22:55
 */
import notifier from 'node-notifier';
import paths from '../paths';
import getWebpackConfig from './core';
import { host, port, protocol } from './devServerOptions';

const webpackConfig = getWebpackConfig();

webpackConfig.mode('development').devtool('cheap-module-source-map');

// plugin => friendly errors
webpackConfig.plugin('friendlyErrors').use(require.resolve('friendly-errors-webpack-plugin'), [
  {
    compilationSuccessInfo: {
      messages: [`You application is running at ${protocol}://${host}:${port}`],
    },
    onErrors: (severity, errors) => {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0];
      notifier.notify({
        title: '编译错误',
        message: `${severity}: ${error.name}`,
        subtitle: error.file || '',
        icon: paths.errorIcon,
      });
    },
  },
]);

const devConfig = webpackConfig.toConfig();

export default devConfig;
