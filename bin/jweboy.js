#!/usr/bin/env node

const program = require("commander");
const initTemplate = require("../package/template");
const { version } = require("../package.json");
const convertImage = require("../package/convert-image");
// const deploy = require("../package/deploy");

program
  .version(version, "-v, --version")
  .usage("<command> [option]")
  .option("-i, --init", "Generate a template from remote github.", initTemplate)
  .option("-c, --convert", "Covert svg to png", convertImage)
  // .option("-d, --deploy", "Deploy project to tencent server", deploy)
  .parse(process.argv); // 将Program写入到命令行

process.on("unhandledRejection", err => {
  throw err;
});
