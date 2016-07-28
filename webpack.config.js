var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    log: './src/index.js',
    app: './src/material/app.js'
  },
  output: {
    path: './public',
    filename: '[name].js'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
      	presets: ['es2015', 'react']
      }
    }]
  }
};
