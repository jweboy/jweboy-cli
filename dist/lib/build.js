"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var build_1 = __importDefault(require("../config/webpack/build"));
var build = function () {
    var compiler = webpack_1.default(build_1.default);
    compiler.run(function (err, stat) {
        console.log(err);
    });
};
exports.default = build;
