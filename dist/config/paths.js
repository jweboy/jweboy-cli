"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathByCurrentDirectory = void 0;
var path_1 = require("path");
var fs_1 = require("../utils/fs");
exports.getPathByCurrentDirectory = function (path) {
    return path_1.join(__dirname, path);
};
var paths = {
    src: fs_1.getRuntimeProjectPath('src'),
    dist: fs_1.getRuntimeProjectPath('dist'),
    nodeModules: fs_1.getRuntimeProjectPath('node_modules'),
    cliNodeModules: exports.getPathByCurrentDirectory('../../node_modules'),
    template: exports.getPathByCurrentDirectory('../../public/index.html'),
    errorIcon: exports.getPathByCurrentDirectory('../../public/error.png'),
};
exports.default = paths;
