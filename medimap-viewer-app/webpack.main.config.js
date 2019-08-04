module.exports = {
  entry: './src/main.js',

  module: {
    rules: [
      // Add support for native node modules
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@marshallofsound/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },

      // Put the rest of the webpack loader rules in this array.
      // See https://github.com/electron-userland/electron-forge/blob/master/packages/template/webpack/tmpl/webpack.rules.js
      // for an example.
    ]
  },
};
