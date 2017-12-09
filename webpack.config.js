var webpack = require("webpack");
var path = require("path");

var config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname+'/public/js',
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["env", 'react']
      }
    },{
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
    }]
  },
  
};

module.exports = config;
