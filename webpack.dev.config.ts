import merge from 'webpack-merge';
import commonConfig from './webpack.common.config';
import path from 'path';
import WebpackNotifierPlugin from 'webpack-notifier';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssAssets from 'postcss-assets';
import TerserPlugin from 'terser-webpack-plugin';
import RemovePlugin from 'remove-files-webpack-plugin';

const {src, dist} = process.env;

const config = merge(commonConfig, {
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  mode: "development",
  devtool: "inline-source-map",
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
            autoprefixer({remove:false}),
            cssnano({
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            }),
            postcssAssets({
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
