const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();

// http://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
function fromDir(startPath, filter, callback) {
  // console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log(`no dir ${startPath}`);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); // recurse
    } else if (filter.test(filename)) {
      callback(filename);
    }
  }
}

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('static'));
app.use(morgan('dev'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const imagesPath = path.join(__dirname, 'static/raspi-imported-photos');
  const images = [];

  fromDir(imagesPath, /\.(png|jpg|JPG|jpeg|JPEG|gif)$/, (filename) => {
    const filenameInfo = path.parse(filename);
    images.push(`/raspi-imported-photos/${filenameInfo.base}`);
  });

  res.render('index', { images, NODE_ENV: process.env.NODE_ENV });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
