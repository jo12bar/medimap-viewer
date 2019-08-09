import React from 'react';
import { hot } from 'react-hot-loader/root';

import Header from '../Header/Header';
import Panel from '../Panel/Panel';

import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <Header className={styles.header} />
    <Panel className={styles.waitTime}><p>Welcome to your Electron/ React/ TypeScript application.</p></Panel>
    <Panel className={styles.slideshow}><p><sub>geez, this is getting bloated...</sub></p></Panel>
  </div>
);

// Mark this root component as "hot-exported"
// (see https://github.com/gaearon/react-hot-loader/blob/v4.12.10/README.md)
export default hot(App);
