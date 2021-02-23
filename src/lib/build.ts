import webpack from 'webpack';
import buildConfig from '../config/webpack/build';

const build = () => {
  const compiler = webpack(buildConfig);

  compiler.run((err, stat) => {
    console.log(err);
  });
};

export default build;
