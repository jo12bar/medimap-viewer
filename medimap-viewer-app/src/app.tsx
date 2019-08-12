// This needs to be imported before React or ReactDOM:
import 'react-hot-loader';

import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import { throttled, hideCursorFromDocument } from './util/util';

import './index.css';

let cursorHideTimerID: ReturnType<typeof setTimeout> | null = null;

document.documentElement.addEventListener('mousemove', throttled(() => {
  if (cursorHideTimerID !== null) {
    clearTimeout(cursorHideTimerID);
  }

  if (document.documentElement.classList.contains('hide-cursor')) {
    document.documentElement.classList.remove('hide-cursor');
  }

  cursorHideTimerID = setTimeout(hideCursorFromDocument, 2000);
}, 200));

ipcRenderer.on('medimap-new-data', console.log);

ReactDOM.render(<App />, document.getElementById('app'));

console.log(`Running in environment ${process.env.NODE_ENV}`);
