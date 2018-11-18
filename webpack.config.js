var webpack = require("webpack");
var path = require("path");

var config = {
  entry: [
    'whatwg-fetch', './src/index.js'
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
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },{
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ],
};

module.exports = config;
