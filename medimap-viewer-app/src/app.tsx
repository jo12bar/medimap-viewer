// This needs to be imported before React or ReactDOM:
import 'react-hot-loader';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App/App';
import { throttled, hideCursorFromDocument } from './util/util';

import './index.css';

let cursorHideTimerID = null;

document.documentElement.addEventListener('mousemove', throttled(() => {
  if (cursorHideTimerID !== null) {
    clearTimeout(cursorHideTimerID);
  }

  if (document.documentElement.classList.contains('hide-cursor')) {
    document.documentElement.classList.remove('hide-cursor');
  }

  cursorHideTimerID = setTimeout(hideCursorFromDocument, 2000);
}, 200));

ReactDOM.render(<App />, document.getElementById('app'));

console.log(`Running in environment ${process.env.NODE_ENV}`);
