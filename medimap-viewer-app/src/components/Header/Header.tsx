import React from 'react';

import {
  isMedimapOpenData,
  isMedimapClosedData,
  isMedimapAtCapacityData,
} from '../../medimap-data';

import withMedimapData, {
  WithMedimapDataPassedDownProps
} from '../WithMedimapData/WithMedimapData';

import styles from './Header.css';

const HeaderOpenCloseIndicator: React.FC<WithMedimapDataPassedDownProps> = ({ msg }) => {
  if (msg === null) {
    // We haven't gotten any data yet. Just act like the clinic is open until
    // told otherwise.
    return <span className={styles.openIndicator}>???</span>;
  }
  else if (isMedimapOpenData(msg) || isMedimapAtCapacityData(msg)) {
    // Clinic is open.
    return <span className={styles.openIndicator}>Open</span>;
  }
  else if (isMedimapClosedData(msg)) {
    // Clinic is closed.
    return <span className={styles.closedIndicator}>Closed</span>;
  }
  else {
    // Some error occurred, or something weirder happened. Say that there's some
    // error.
    return <span className={styles.closedIndicator}>Error</span>;
  }
}

const EnhancedHeaderOpenCloseIndicator = withMedimapData(HeaderOpenCloseIndicator);

interface HeaderProps {
  clinicName: string,
  className: string,
}

const Header: React.FC<HeaderProps> = ({ className, clinicName }) => (
  <header className={`${className} ${styles.header}`}>
    <h1>{clinicName}</h1>
    <EnhancedHeaderOpenCloseIndicator />
  </header>
);

export default Header;
