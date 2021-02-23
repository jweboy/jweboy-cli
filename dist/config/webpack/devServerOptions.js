"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocol = exports.port = exports.host = void 0;
var paths_1 = __importDefault(require("../paths"));
exports.host = process.env.HOST || '0.0.0.0';
exports.port = parseInt(process.env.PORT, 10) || 3000;
exports.protocol = process.env.HTTPS ? 'https' : 'http';
var devServerOptions = {
    quiet: true,
    injectClient: false,
    transportMode: 'ws',
    clientLogLevel: 'none',
    contentBase: paths_1.default.dist,
    noInfo: true,
    overlay: true,
    compress: true,
    hot: true,
    useLocalIp: true,
    writeToDisk: true,
    watchContentBase: true,
    https: exports.protocol === 'https',
    host: exports.host,
    port: exports.port,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
        'access-control-allow-origin': '*',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    stats: 'errors-only',
};
exports.default = devServerOptions;
