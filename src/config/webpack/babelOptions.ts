/*
 * @Author: jweboy
 * @Date: 2020-01-06 16:26:36
 * @LastEditors  : jweboy
 * @LastEditTime : 2020-01-06 18:26:41
 */
const options = {
  cacheDirectory: true,
  babelrc: false,
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-async-generator-functions'), // for await of

    // FIXME: 这两个插件的顺序不能替换
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }], // 高阶声明(装饰器)
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],

    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
    require.resolve('@babel/plugin-proposal-optional-chaining'),
    require.resolve('@babel/plugin-proposal-do-expressions'),
    require.resolve('@babel/plugin-proposal-function-bind'),
    require.resolve('@babel/plugin-transform-destructuring'),
    // babel-plugin-macros
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd',
        style: 'css',
      },
    ],
  ],
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: 'commonjs',
        targets: { browsers: ['last 2 versions'] },
      },
    ],
    require.resolve('@babel/preset-react'),
  ],
};

export default options;
