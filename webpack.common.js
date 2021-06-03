const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        { from: 'static/robots.txt', to: 'robots.txt' },
        { from: 'static/sitemap.xml', to: 'sitemap.xml' },
        { from: 'static/manifest.webmanifest', to: 'manifest.webmanifest' },
        { from: 'static/favicon.ico', to: 'favicon.ico' },
        { from: 'static/icon.svg', to: 'icon.svg' },
        { from: 'static/icon-192.png', to: 'icon-192.png' },
        { from: 'static/icon-512.png', to: 'icon-512.png' },
        { from: 'static/apple-touch-icon.png', to: 'apple-touch-icon.png' },
      ],
    }),
  ],
};
