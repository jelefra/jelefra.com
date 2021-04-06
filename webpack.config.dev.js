const config = require('./webpack.config.js');

config.devServer = {
  contentBase: './dist',
};

config.devtool = 'inline-source-map';

config.mode = 'development';

module.exports = config;
