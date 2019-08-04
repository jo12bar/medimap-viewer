'use strict';

let cursorHideTimerID = null;

/**
 * Throttles a function to only run when the delay has expired.
 * @param  {Number} delay The amount of time (in milliseconds) to delay the
 *                        wait before allowing the function to be called again.
 * @param  {Function} f   The function to be throttled. Will have all arguments
 *                        passed to the returned function passed down to it.
 * @return {Function}     A version of `f` throttled to only execute every
 *                        `delay` milliseconds.
 */
const throttled = (delay, f) => {
  let lastCall = 0;
  return (...args) => {
    const now = (new Date()).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return f(...args);
  }
}

/** Hide the cursor from an element. */
const hideCursor = el => el.classList.add('hide-cursor');

const hideCursorFromDocument = () => hideCursor(document.documentElement);

document.documentElement.addEventListener('mousemove', throttled(200, () => {
  if (cursorHideTimerID !== null) {
    clearTimeout(cursorHideTimerID);
  }

  if (document.documentElement.classList.contains('hide-cursor')) {
    document.documentElement.classList.remove('hide-cursor');
  }

  cursorHideTimerID = setTimeout(hideCursorFromBody, 2000);
}));
