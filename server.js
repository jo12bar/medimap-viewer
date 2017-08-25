const axios = require('axios');
const config = require('./local/config');
const dedent = require('dedent');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const touch = require('touch');

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

  const viewConfig = {
    images,
    NODE_ENV: process.env.NODE_ENV,
  };

  res.render('index', viewConfig);
});

// Proxy the request for medimap's widget to avoid crossorigin problems.
// (Needed as crossorigin.me has stopped working.)
app.get('/api/medimap-widget', (req, res) => {
  const { clinicID = 1 } = config;
  const url = `https://medimap.ca/clinics/widgetdata/${clinicID}.json`;

  axios.get(url)
    .then(({ data }) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500)
        .message(dedent`
          Unable to fetch medimap widget.

            Response status: ${err.response.status}

            Response message/ data: ${err.response.data}

            Response headers: ${err.response.headers}
        `);
    });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');

  // In production, let the startup script know that the server is running.
  // File should be immediately removed by startup script.
  if (process.env.NODE_ENV === 'production') {
    touch.sync(path.join(__dirname, '.node-server-is-running'));
  }
});
