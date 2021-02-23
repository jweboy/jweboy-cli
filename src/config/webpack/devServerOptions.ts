import { Configuration } from 'webpack-dev-server';
import paths from '../paths';

export const host = process.env.HOST || '0.0.0.0';
export const port = parseInt(process.env.PORT, 10) || 3000;
export const protocol = process.env.HTTPS ? 'https' : 'http';

const devServerOptions: Configuration = {
  quiet: true, // 隐藏webpack的错误或警告信息
  injectClient: false, // 防止WS客户端被注入
  transportMode: 'ws',
  clientLogLevel: 'none', // 显示在开发者控制台的消息
  contentBase: paths.dist, // 提供静态资源的目录
  noInfo: true, // 隐藏bundle信息,只接收错误和警告信息
  overlay: true, // 在浏览器中全屏显示错误信息
  compress: true, // 启用gzip压缩
  hot: true, // 模块热更新
  useLocalIp: true,
  writeToDisk: true,
  // publicPath: devConfig.output.publicPath, // 浏览器中访问的静态资源目录
  watchContentBase: true, // 监听文件变化刷新页面
  https: protocol === 'https', // 是否使用https协议
  host, // 主机名
  port, // 端口
  historyApiFallback: true, // 任意 404 响应都重定向到 index.html
  disableHostCheck: true, // 绕过主机检查
  headers: {
    'access-control-allow-origin': '*', // 跨域请求头
  },
  watchOptions: {
    ignored: /node_modules/, // 排除 node_modules 目录监听
  },
  stats: 'errors-only',
};

export default devServerOptions;
