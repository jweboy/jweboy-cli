"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRuntimeProjectPath = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.getRuntimeProjectPath = function (path, rootPath) {
    if (rootPath === void 0) { rootPath = process.cwd(); }
    var appPath = fs_1.realpathSync(rootPath);
    var fullPath = path_1.join(appPath, path);
    return fullPath;
};
