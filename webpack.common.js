const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const getPostPath = (absoluteFilename) =>
  absoluteFilename.match(/\d\d-\d\d-\d\d-([^/]+)/)[1];

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static'),
        },
        {
          from: '**/*.{jpg,avif,png}',
          to({ absoluteFilename }) {
            const postPath = getPostPath(absoluteFilename);
            return postPath + '/[name][ext]';
          },
          context: path.resolve(__dirname, 'src', 'posts'),
        },
      ],
    }),
  ],
};
