"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var webpack_chain_1 = __importDefault(require("webpack-chain"));
var paths_1 = __importDefault(require("../paths"));
var babelOptions_1 = __importDefault(require("./babelOptions"));
var getWebpackConfig = function () {
    var config = new webpack_chain_1.default();
    config.cache({
        type: 'filesystem',
    });
    config.entry('index').add(paths_1.default.src);
    config.output
        .path(paths_1.default.dist)
        .filename('js/[name].js')
        .chunkFilename('js/[name].chunk.js')
        .publicPath('/');
    config.resolve.modules
        .add('node_modules')
        .end()
        .extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.json']);
    config.resolve.alias.set('@', paths_1.default.src);
    config.module
        .rule('jsOrJSX')
        .test(/\.js(x)?$/)
        .include.add(paths_1.default.src)
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOptions_1.default);
    config.module
        .rule('tsOrTSX')
        .test(/\.ts(x)?$/)
        .include.add(paths_1.default.src)
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOptions_1.default);
    config.module
        .rule('moduleLess')
        .test(/\.css$/)
        .include.add(paths_1.default.nodeModules)
        .add(paths_1.default.cliNodeModules)
        .end()
        .use('style-loader')
        .loader(require.resolve('style-loader'))
        .end()
        .use('css-loader')
        .loader(require.resolve('css-loader'));
    config.module
        .rule('appLess')
        .test(/\.less$/)
        .include.add(paths_1.default.src)
        .end()
        .use('style-loader')
        .loader(require.resolve('style-loader'))
        .end()
        .use('@teamsupercell/typings-for-css-modules-loader')
        .loader(require.resolve('@teamsupercell/typings-for-css-modules-loader'))
        .end()
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({
        modules: {
            localIdentName: '[name]__[local]',
        },
        sourceMap: true,
        localsConvention: 'camelCase',
    })
        .end()
        .use('less')
        .loader(require.resolve('less-loader'))
        .options({
        javascriptEnabled: true,
        sourceMap: true,
    });
    config.module
        .rule('file')
        .test(/\.(png|jp(e)?g|gif|svg|eot|ttf|woff|woff2)?$/)
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
        limit: 10240,
        name: 'static/[name].[hash:8].[ext]',
    });
    config.plugin('html').use(require.resolve('html-webpack-plugin'), [
        {
            title: 'template',
            template: paths_1.default.template,
        },
    ]);
    config.plugin('progress').use(webpack_1.default.ProgressPlugin, [{ percentBy: 'entries' }]);
    config.plugin('ignore').use(webpack_1.default.WatchIgnorePlugin, [{ paths: [/less\.d\.ts/] }]);
    return config;
};
exports.default = getWebpackConfig;
