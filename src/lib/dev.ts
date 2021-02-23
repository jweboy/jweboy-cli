/*
 * @Author: jweboy
 * @Date: 2019-12-18 18:14:59
 * @LastEditors  : jweboy
 * @LastEditTime : 2020-01-10 13:25:40
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devServerOptions, { host, port } from '../config/webpack/devServerOptions';
import devConfig from '../config/webpack/dev';

process.env.NODE_ENV = 'development';

// const { choosePort } import '../utils/devServerUtils');
// const rootPath = process.cwd();

function dev() {
  const compiler = webpack(devConfig);

  // console.log(webpackConfig);
  // return;
  const devServer = new WebpackDevServer(compiler, devServerOptions);
  // Launch server
  devServer.listen(port, host, (err: Error) => {
    if (err) {
      process.exit(-1);
    }
  });
}

export default dev;

// choosePort(HOST, PORT).then(() => {
//   console.log('ok;');
//   //   // TODO: 注释
//   //   ['SIGINT', 'SIGTERM'].forEach((sig) => {
//   //     process.on(sig, () => {
//   //       devServer.close();
//   //       process.exit();
//   //     });
//   //   });
// });
