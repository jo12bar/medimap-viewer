const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      // Javascript and typescript support
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      // Lets CSS files get added to the bundle
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true, // Backup for if HMR doesn't work
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      // For react HMR
      'react-dom': devMode ? '@hot-loader/react-dom' : 'react-dom',

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

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),

    new TypedCssModulesPlugin({
      globPattern: 'src/**/*.css',
    }),
  ],
};
