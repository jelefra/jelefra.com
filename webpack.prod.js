const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
});
