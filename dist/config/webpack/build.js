"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("./core"));
var terserOptions_1 = __importDefault(require("./terserOptions"));
var webpackConfig = core_1.default();
webpackConfig.mode('production');
webpackConfig.output.filename("[name].[contenthash:8].js").chunkFilename("[name].[contenthash:8].chunk.js");
webpackConfig.performance.hints(false);
webpackConfig.optimization.splitChunks({
    chunks: 'async',
    name: 'vendors',
});
webpackConfig.optimization
    .set('emitOnErrors', true)
    .minimizer('terser')
    .use(require.resolve('terser-webpack-plugin'), [terserOptions_1.default])
    .end();
webpackConfig.plugin('mini-css').use(require.resolve('mini-css-extract-plugin'), [
    {
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].chunk.css",
    },
]);
var buildConfig = webpackConfig.toConfig();
exports.default = buildConfig;
