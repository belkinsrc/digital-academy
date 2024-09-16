import path from 'path';
import { Configuration } from 'webpack';
import { buildWebpack } from './config/webpack';
import { BuildMode, BuildPaths } from './config/types';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
}

export default (env: EnvVariables): Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const config: Configuration = buildWebpack({
    mode: env.mode,
    paths,
    port: env.port,
  });

  return config;
};

