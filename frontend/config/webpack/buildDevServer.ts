import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from '../types';

const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
  const { paths, port } = options;

  return {
    static: paths.output,
    port: port ?? 3000,
    open: true,
    proxy: [
      {
        context: () => true,
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,
      },
    ],
    allowedHosts: 'all',
  };
};

export { buildDevServer };
