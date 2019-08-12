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
    alias: {
      // The currently-lockfiled version of htmlparser2 (v3.10.1, required
      // by cheerio) includes a version of the entities package that moved
      // several json files around without making a major semver change. These
      // aliases get around that behaviour, and should probably be removed some
      // day. All cheerio needs to do is upgrade htmlparser2 to ^v4.0.0.
      'entities/maps/entities.json': 'entities/lib/maps/entities.json',
      'entities/maps/legacy.json': 'entities/lib/maps/legacy.json',
      'entities/maps/xml.json': 'entities/lib/maps/xml.json',
    },
  },
};
