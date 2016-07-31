/* eslint-disable */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'hmr.js'),
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  devtool: 'eval-source-map',
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
        loader: 'style-loader!css-loader!postcss-loader?parser=postcss-safe-parser',
      },
      {
        test: /\.css$/,
        include: /(node_modules|bower_components)/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  postcss: function() {
    return [require('precss')({ addDependencyTo: webpack }), require('autoprefixer')];
  },
};
