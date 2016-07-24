/* eslint-disable */

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'static/js'),
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract({
        //   fallbackLoader: 'style-loader',
        //   loader: 'css-loader!postcss-loader?parser=postcss-safe-parser',
        //   publicPath: '/css/'
        // }),
        loader: 'style-loader!css-loader!postcss-loader?parser=postcss-safe-parser',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  postcss: function() {
    return [require('precss'), require('lost'), require('autoprefixer')];
  },
};
