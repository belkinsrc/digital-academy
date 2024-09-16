import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions, RuleSetRule } from 'webpack';
import { BuildOptions } from '../types';

const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const { mode, paths } = options;

  const cssLoader: RuleSetRule = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: (resourcePath: string) => !resourcePath.includes('node_modules'),
        // auto: true,
        localIdentName:
          mode === 'production' ? '[hash:base64]' : '[path][name]__[local]',
        exportLocalsConvention: 'camel-case',
      },
    },
  };

  const tsLoader: RuleSetRule = {
    loader: 'ts-loader',
    options: {
      transpileOnly: mode === 'development' ? true : false,
    },
  };

  const styles: RuleSetRule = {
    // test: /\.s[ac]ss$/i,
    test: /\.(s[ac]ss|css)$/i,
    use: [
      mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
      cssLoader,
      'sass-loader',
    ],
    include: paths.src,
    exclude: /node_modules/,
  };

  const externalStyles: RuleSetRule = {
    test: /\.css$/i,  
    use: [
      mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',  
    ],
    include: /node_modules/,  
  };

  const scripts: RuleSetRule = {
    test: /\.tsx?$/,
    use: [tsLoader],
    exclude: /node_modules/,
  };

  const images: RuleSetRule = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const fonts: RuleSetRule = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  return [scripts, styles, externalStyles, images, fonts];
};

export { buildLoaders };
