module.exports = [
  {
    name: "packageManager",
    type: "list",
    message: "Choose a package manager:",
    choices: ["yarn", "npm"]
  },
  {
    name: "tempalteName",
    type: "list",
    message: "Choose a project tempalte:",
    choices: ["react-webpack-toolkit", "project-starter"]
  },
  {
    name: "projectName",
    type: "input",
    message: "Input the project name:"
  }
];
