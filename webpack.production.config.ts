import path from 'path';
import merge from 'webpack-merge';
import commonConfig from './webpack.common.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import RemovePlugin from 'remove-files-webpack-plugin';
import sass from 'sass';

const {src, dist} = process.env;

const config = merge(commonConfig, {
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  mode: "production",
  optimization: {
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: "my-vendor",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new RemovePlugin({
      after: {
        test: [
          {
            folder: path.resolve(dist!, "css"),
            method: (absoluteItemPath) => {
              return new RegExp(/bundle$/, "m").test(absoluteItemPath);
            },
            recursive: true,
          },
          {
            folder: path.resolve(dist!),
            method: (absoluteItemPath) => {
              return new RegExp(/\/_.+\.html$/, "m").test(absoluteItemPath);
            },
            recursive: true,
          },
        ],
      },
    }),
  ],
});

config.module!.rules!.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        importLoaders: 1,
        url: false,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            // ↓ 手動で追加したベンダープレフィックスが削除されるのを防ぐ
            require("autoprefixer")({remove:false}),
            require("cssnano"),
            require("postcss-assets")({
              loadPaths: [
                path.join(src!, "images"),
                path.join(src!, "fonts"),
              ],
              relative: true,
            }),
          ],
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        sassOptions: {
          includePaths: [
            path.resolve(src!, "styles"),
            path.resolve(__dirname, "./node_modules"),
          ],
        },
      },
    },
  ],
});

export default config;
