const path = require('path');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  target: 'web',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [...(process.env.STATS ? [new BundleAnalyzerPlugin()] : [])],
});
