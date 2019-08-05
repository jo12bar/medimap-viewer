/**
 * Throttles a function to only fire every `waitTime` milliseconds.
 * @param  f The function to throttle.
 * @param  waitTime
 * @return [description]
 */
export const throttled = (f: (...args: any[]) => any, waitTime: number) => {
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
export const hideCursor = (el: HTMLElement) => el.classList.add('hide-cursor');

/** Hide the cursor from the <html> element */
export const hideCursorFromDocument = () => hideCursor(document.documentElement);
