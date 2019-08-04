// This needs to be imported before React or ReactDOM:
import 'react-hot-loader';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

require('./index.css');

let cursorHideTimerID = null;

/**
 * Throttles a function to only fire every `waitTime` milliseconds.
 * @param  f The function to throttle.
 * @param  waitTime
 * @return [description]
 */
const throttled = (f: (...args: any[]) => any, waitTime: number) => {
  let isCalled = false;

  return (...args: any[]) => {
    if (!isCalled) {
      isCalled = true;
      setTimeout(() => { isCalled = false; }, waitTime);
      return f(...args);
    }
  }
};

/** Hide the cursor from an element. */
const hideCursor = (el: HTMLElement) => el.classList.add('hide-cursor');

const hideCursorFromDocument = () => hideCursor(document.documentElement);

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
