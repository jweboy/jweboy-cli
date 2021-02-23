/*
 * @Author: jweboy
 * @Date: 2019-12-19 16:43:09
 * @LastEditors  : jweboy
 * @LastEditTime : 2020-01-20 14:57:44
 */
import webpack from 'webpack';
import Config from 'webpack-chain';
import paths from '../paths';
import babelOptions from './babelOptions';

const getWebpackConfig = () => {
  const config = new Config();

  /** ========================= cache ========================= */

  config.cache({
    type: 'filesystem',
  });

  /** ========================= entry、output ========================= */

  config.entry('index').add(paths.src);

  config.output
    .path(paths.dist)
    .filename('js/[name].js')
    .chunkFilename('js/[name].chunk.js')
    .publicPath('/');

  /** ========================= resolve ========================= */

  config.resolve.modules
    .add('node_modules')
    // .add(paths.nodeModules)
    .end()
    .extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.json']);

  config.resolve.alias.set('@', paths.src);

  /** ========================= module ========================= */

  // module => babel
  config.module
    .rule('jsOrJSX')
    .test(/\.js(x)?$/)
    .include.add(paths.src)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOptions);

  // module => ts
  config.module
    .rule('tsOrTSX')
    .test(/\.ts(x)?$/)
    .include.add(paths.src)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOptions);

  // node_modules 不需要css modules处理
  config.module
    .rule('moduleLess')
    .test(/\.css$/)
    .include.add(paths.nodeModules)
    .add(paths.cliNodeModules)
    .end()
    .use('style-loader')
    .loader(require.resolve('style-loader'))
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'));

  config.module
    .rule('appLess')
    .test(/\.less$/)
    .include.add(paths.src)
    .end()
    .use('style-loader')
    .loader(require.resolve('style-loader'))
    .end()
    // 自动生成 *.less.d.ts 文件
    .use('@teamsupercell/typings-for-css-modules-loader')
    .loader(require.resolve('@teamsupercell/typings-for-css-modules-loader'))
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      modules: {
        localIdentName: '[name]__[local]',
        // localIdentName: '[name]__[local]--[hash:base64:5]', // for pro
      },
      sourceMap: true,
      localsConvention: 'camelCase', // 支持小驼峰转换 app-logo => styles.appLogo
    })
    .end()
    .use('less')
    .loader(require.resolve('less-loader'))
    .options({
      javascriptEnabled: true,
      sourceMap: true,
    });

  // module => file
  config.module
    .rule('file')
    .test(/\.(png|jp(e)?g|gif|svg|eot|ttf|woff|woff2)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: 10240,
      name: 'static/[name].[hash:8].[ext]',
    });

  /** ========================= plugin ========================= */

  // 模板页面
  config.plugin('html').use(require.resolve('html-webpack-plugin'), [
    {
      title: 'template',
      template: paths.template,
    },
  ]);

  // 进度提示
  config.plugin('progress').use(webpack.ProgressPlugin, [{ percentBy: 'entries' }]);

  // 文件监听忽略
  config.plugin('ignore').use(webpack.WatchIgnorePlugin, [{ paths: [/less\.d\.ts/] }]);

  return config;
};

export default getWebpackConfig;
