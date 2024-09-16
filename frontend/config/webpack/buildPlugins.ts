import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { BuildOptions } from '../types';

const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
  const { paths, mode } = options;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, paths.public, 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images' },
      ],
    }),
  ];

  if (mode === 'development') {
    plugins.push(new ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  if (mode === 'production') {
    plugins.push(new MiniCssExtractPlugin());
  }

  return plugins;
};

export { buildPlugins };
