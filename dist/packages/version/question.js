"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_1 = require("./typings");
var questions = [
    {
        name: 'versionCode',
        type: 'list',
        choices: [typings_1.VersionType.Major, typings_1.VersionType.Minor, typings_1.VersionType.Patch],
        message: '请选择需要发布的版本类型：主版本号(major)，次版本号(minor)，修订号(patch)',
    },
];
exports.default = questions;
