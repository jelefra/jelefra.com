const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const getCamelCasePostName = (absoluteFilename) =>
  absoluteFilename.match(/\d\d-\d\d-\d\d-(\w+)/)[1];

const kebabise = (str) =>
  str.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());

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
          globOptions: { ignore: ['**/original/**'] },
        },
        {
          from: '**/*.{jpg,avif}',
          to({ absoluteFilename }) {
            const camelCasePostName = getCamelCasePostName(absoluteFilename);
            const kebabCasePostName = kebabise(camelCasePostName);
            return kebabCasePostName + '/[name][ext]';
          },
          context: path.resolve(__dirname, 'src', 'posts'),
        },
      ],
    }),
  ],
};
