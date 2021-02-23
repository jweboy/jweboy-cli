/*
 * @Author: jweboy
 * @Date: 2020-01-06 16:39:25
 * @LastEditors  : jweboy
 * @LastEditTime : 2020-01-07 11:11:14
 */
import webpack from 'webpack';
import getWebpackConfig from './core';
import terserOptions from './terserOptions';

const webpackConfig = getWebpackConfig();

webpackConfig.mode('production');

webpackConfig.output.filename(`[name].[contenthash:8].js`).chunkFilename(`[name].[contenthash:8].chunk.js`);

// webpackConfig.plugin('hashModuleIds').use(webpack.ids.HashedModuleIdsPlugin);

// 关闭性能提示
webpackConfig.performance.hints(false);

// 拆包
webpackConfig.optimization.splitChunks({
  chunks: 'async',
  name: 'vendors',
});

// 压缩代码
webpackConfig.optimization
  .set('emitOnErrors', true) // 出现错误不能进入生成阶段
  .minimizer('terser')
  .use(require.resolve('terser-webpack-plugin'), [terserOptions])
  .end();

// 打包css
webpackConfig.plugin('mini-css').use(require.resolve('mini-css-extract-plugin'), [
  {
    filename: `[name].[contenthash:8].css`,
    chunkFilename: `[name].[contenthash:8].chunk.css`,
  },
]);

const buildConfig = webpackConfig.toConfig();

export default buildConfig;
