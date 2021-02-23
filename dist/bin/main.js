#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var build_1 = __importDefault(require("../lib/build"));
var dev_1 = __importDefault(require("../lib/dev"));
commander_1.program
    .command('dev')
    .description('start dev server')
    .action(dev_1.default);
commander_1.program
    .command('build')
    .description('start build bundle')
    .action(build_1.default);
commander_1.program.parse(process.argv);
if (!commander_1.program.args.length)
    commander_1.program.help();
process.on('unhandledRejection', function (err) {
    throw err;
});
