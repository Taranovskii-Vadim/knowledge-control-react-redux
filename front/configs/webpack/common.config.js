'use strict';

// TODO: иконки ant design tree shaking
// TODO: для moment локали убрать позже

const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = require('./dev.config');

const rootDir = path.resolve(__dirname, '..', '..');

const getCommonConfig = (mode) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  const ifProduction = (option) => (isProduction ? option : null);
  const ifDevelopment = (option) => (isDevelopment ? option : null);

  return {
    entry: {
      main: ['@babel/polyfill', './src/index.tsx'],
    },
    output: {
      filename: isDevelopment ? '[name].js' : '[name].[hash].js',
      path: path.resolve(rootDir, 'build'),
      chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
      publicPath: '/',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.less', '.json'],
      alias: {
        src: path.resolve(rootDir, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [['import', { libraryName: 'antd', style: true }]],
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : {
                  loader: 'style-loader',
                },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
              options: {
                import: false,
                importLoaders: 1,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                  exportLocalsConvention: 'camelCase',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(rootDir, 'configs', 'postcss'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        minify: ifProduction({
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        }),
        chunks: ['main'],
        template: path.resolve(rootDir, 'public/index.html'),
      }),
      ifProduction(
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].css',
          chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
        }),
      ),
    ].filter(Boolean),
  };
};

module.exports = (env, arg) => {
  const { mode } = arg;
  const config = getCommonConfig(mode);

  if (['development'].includes(mode)) {
    return merge(devConfig, config);
  }

  return config;
};
