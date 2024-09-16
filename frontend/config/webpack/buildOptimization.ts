import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { Configuration } from 'webpack';
import { BuildOptions } from '../types';

const buildOptimization = (
  options: BuildOptions
): Configuration['optimization'] => {
  return {
    minimizer: [new CssMinimizerPlugin()],
  };
};

export { buildOptimization };
