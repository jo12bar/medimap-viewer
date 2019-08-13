import React from 'react';
import styles from './OpenWaitTime.css';

interface OpenWaitTimeProps {
  waitTime: number,
  lastUpdated: string,
}

/** Displays the current wait time for a clinic that is open. */
const OpenWaitTime: React.FC<OpenWaitTimeProps> = ({ waitTime, lastUpdated }) => (
  <div className={styles.openWaitTime}>
    <p>Current wait time:</p>
    <p className={styles.numberMinutes}>{waitTime}</p>
    <p>minutes</p>
    <p className={styles.lastUpdated}>Last updated {lastUpdated}</p>
  </div>
);

export default OpenWaitTime;
