module.exports = {
  entry: './src/main.ts',

  module: {
    rules: [
      // Add support for native node modules
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(m?js|ts|node)$/,
        parser: { amd: false },
        use: {
          loader: '@marshallofsound/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },

      // Javascript and Typescript support. Note that we have to redefine the
      // babel config here so we can get a different browserslist config. Might
      // be a different way to do this, but I'm too lazy... ;)
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'node 12',
              }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        }
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};
