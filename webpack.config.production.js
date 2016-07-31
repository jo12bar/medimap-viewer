/* eslint-disable */

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'static/js'),
    filename: 'bundle.js',
    publicPath: '/',
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
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?parser=postcss-safe-parser'),
        // loader: 'style-loader!css-loader!postcss-loader?parser=postcss-safe-parser',
      },
      {
        test: /\.css$/,
        include: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000&name=../fonts/[hash].[ext]',
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
    new ExtractTextPlugin('../css/styles.css'),
  ],
  postcss: function() {
    return [require('precss')({ addDependencyTo: webpack }), require('autoprefixer')];
  },
};
