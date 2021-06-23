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
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-mobile.jpg',
          to: 'home-server-evolution-stone-age/raspberry-pi-mobile.jpg',
        },
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-2x.jpg',
          to: 'home-server-evolution-stone-age/raspberry-pi-2x.jpg',
        },
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-1x.jpg',
          to: 'home-server-evolution-stone-age/raspberry-pi-1x.jpg',
        },
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-mobile.avif',
          to: 'home-server-evolution-stone-age/raspberry-pi-mobile.avif',
        },
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-2x.avif',
          to: 'home-server-evolution-stone-age/raspberry-pi-2x.avif',
        },
        {
          from:
            'src/posts/21-06-18-homeServerEvolutionStoneAge/raspberry-pi-1x.avif',
          to: 'home-server-evolution-stone-age/raspberry-pi-1x.avif',
        },
        {
          from: 'static/img/raspberry-pi-1x1.jpg',
          to: 'img/raspberry-pi-1x1.jpg',
        },
        {
          from: 'static/img/raspberry-pi-4x3.jpg',
          to: 'img/raspberry-pi-4x3.jpg',
        },
        {
          from: 'static/img/raspberry-pi-16x9.jpg',
          to: 'img/raspberry-pi-16x9.jpg',
        },
      ],
    }),
  ],
};
