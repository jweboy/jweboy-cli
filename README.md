# jweboy-cli

一个可以提高日常开发效率的 `cli` 脚手架

## Getting Started

```js
npm install -g jweboy-cli

yarn global  add jweboy-cli
```

## Future

- `-i, --init` 新建项目模版，主要包括 [react+webpack模版](https://github.com/jweboy/react-webpack-toolkit)、[eslint+prettier模版](https://github.com/jweboy/project-starter)。

- `-d` `--deploy` 静态资源部署，主要通过 `ssh` 连接远程服务器，然后自动执行目录文件拷贝。

## Description

项目采用 `lerna` 进行多个 `package` 的管理，配置文件如下：

```js
{
  "packages": ["packages/*"],
  "version": "0.0.1",
  "command": {
    "bootstrap": {
      "npmClientArgs": ["--no-package-lock"]
    }
  }，
  "npmClient": "yarn"
}
```

`lerna` 使用命令说明

```js
$ lerna bootstrap 安装所有 `package` 的依赖模块
$ lerna clean 删除所有 `package` 的依赖模块
```

## TODO

- lerna 增加 workspace 配置(搭建个人 npm 仓库)
