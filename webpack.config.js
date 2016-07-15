var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'log.js'
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
      	presets: ['es2015']
      }
    }]
  }
};
