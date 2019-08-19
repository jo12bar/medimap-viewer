import React from 'react';
import { hot } from 'react-hot-loader/root';
import { CLINIC_NAME } from '../../config';

import Centered from '../Centered/Centered';
import HeaderContainer from '../Header/HeaderContainer';
import WaitTime from '../WaitTime/WaitTime';
import Panel from '../Panel/Panel';

import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <HeaderContainer className={styles.header} clinicName={CLINIC_NAME} />
    <Panel className={styles.waitTime}>
      <Centered horizontally={true} vertically={true}>
        <WaitTime />
      </Centered>
    </Panel>
    <Panel className={styles.slideshow}><p><sub>geez, this is getting bloated...</sub></p></Panel>
  </div>
);

// Mark this root component as "hot-exported"
// (see https://github.com/gaearon/react-hot-loader/blob/v4.12.10/README.md)
export default hot(App);
