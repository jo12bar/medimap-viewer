import React from 'react';
import styles from './OpenWaitTime.css';

/** Displays the current wait time for a clinic that is open. */
const OpenWaitTime = () => (
  <div className={styles.openWaitTime}>
    <p>Current wait time:</p>
    <p className={styles.numberMinutes}>888</p>
    <p>minutes</p>
  </div>
);

export default OpenWaitTime;
