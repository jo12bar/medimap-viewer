import * as React from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => (
  <div>
    <h1>💖 Hello World! he he he</h1>
    <p>Welcome to your Electron/ React/ TypeScript application.</p>
    <p><sub>geez, this is getting bloated...</sub></p>
  </div>
);

// Mark this root component as "hot-exported"
// (see https://github.com/gaearon/react-hot-loader/blob/v4.12.10/README.md)
export default hot(App);
