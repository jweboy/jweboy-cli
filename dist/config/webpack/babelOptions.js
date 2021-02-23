"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    cacheDirectory: true,
    babelrc: false,
    plugins: [
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        require.resolve('@babel/plugin-proposal-async-generator-functions'),
        [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
        [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
        require.resolve('@babel/plugin-proposal-export-namespace-from'),
        require.resolve('@babel/plugin-proposal-export-default-from'),
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        require.resolve('@babel/plugin-proposal-do-expressions'),
        require.resolve('@babel/plugin-proposal-function-bind'),
        require.resolve('@babel/plugin-transform-destructuring'),
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
exports.default = options;
