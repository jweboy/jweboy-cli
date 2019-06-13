# jweboy-cli

一个可以提高日常开发效率的 `cli` 脚手架

## Getting Started

```js
npm install -g jweboy-cli

yarn add --global jweboy-cli
```

## Future

- `-i, --init` 新建项目模版，主要包括 [react+webpack模版](https://github.com/jweboy/react-webpack-toolkit)、[eslint+prettier模版](https://github.com/jweboy/project-starter)。
- `-c, --convert` 转换 `SVG` 格式图片为 `PNG`、`JPG`、`JPEG` 等格式的图片。

- `-d` `--deploy` 将打包后的静态文件拷贝到本地 nginx 文件中的 html 目录，并自动执行 Docker 镜像更新和容器重启，自动部署静态项目到服务器。(待更新)

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
  }
}
```

`lerna` 使用命令说明

```js
$ lerna bootstrap 安装所有 `package` 的依赖模块
$ lerna clean 删除所有 `package` 的依赖模块
```

## TODO

- lerna 增加 workspace 配置
