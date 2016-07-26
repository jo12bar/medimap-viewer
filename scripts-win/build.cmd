@ECHO OFF

cross-env BABEL_ENV=production webpack --config webpack.config.production.js
