const path = require('path');
const { merge } = require('webpack-merge');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'umd',
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: ['/', '/404.html'],
    }),
  ],
});
