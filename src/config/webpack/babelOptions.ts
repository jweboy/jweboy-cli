/*
 * @Author: jweboy
 * @Date: 2020-01-06 16:26:36
 * @LastEditors: jweboy
 * @LastEditTime: 2021-05-08 00:17:16
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
    /**
     * @description 编译文件中的 ts 声明包括 .ts .tsx 文件），具体配置点击以下链接查看
     * @url https://www.babeljs.cn/docs/babel-preset-typescript
     */
    require.resolve('@babel/preset-typescript'),
  ],
};

export default options;
