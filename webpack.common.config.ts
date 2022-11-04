import path from 'path';
import globule from 'globule';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import ProjectConfig from './project.config';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const {src, dist} = process.env;

const commonConfig: webpack.Configuration = {
  entry: ProjectConfig.entries,
  output: {
    filename: "[name].js",
    path: path.resolve(dist!),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["svg-sprite-loader", "svg-transform-loader", "svgo-loader"],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  // externals: {
  //   jquery: "jQuery",
  // },
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    modules: ["node_modules", path.resolve(src!, "scripts/")],
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.css', '.scss', '.json'],
  },
  performance: { hints: false },
  plugins: [
    new RemoveEmptyScriptsPlugin({enabled: true}),
    new MiniCssExtractPlugin({
      filename: "[name]",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(src!, "images"), to: dist },
        // { from: path.resolve(src, "fonts"), to: "fonts/" },
      ],
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    // }),
  ],
};

export default commonConfig;
