"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_notifier_1 = __importDefault(require("node-notifier"));
var paths_1 = __importDefault(require("../paths"));
var core_1 = __importDefault(require("./core"));
var devServerOptions_1 = require("./devServerOptions");
var webpackConfig = core_1.default();
webpackConfig.mode('development').devtool('cheap-module-source-map');
webpackConfig.plugin('friendlyErrors').use(require.resolve('friendly-errors-webpack-plugin'), [
    {
        compilationSuccessInfo: {
            messages: ["You application is running at " + devServerOptions_1.protocol + "://" + devServerOptions_1.host + ":" + devServerOptions_1.port],
        },
        onErrors: function (severity, errors) {
            if (severity !== 'error') {
                return;
            }
            var error = errors[0];
            node_notifier_1.default.notify({
                title: '编译错误',
                message: severity + ": " + error.name,
                subtitle: error.file || '',
                icon: paths_1.default.errorIcon,
            });
        },
    },
]);
var devConfig = webpackConfig.toConfig();
exports.default = devConfig;
