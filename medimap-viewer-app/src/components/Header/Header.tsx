import React from 'react';

import styles from './Header.css';

interface HeaderProps {
  clinicName: string,
  className: string,
  open: boolean,
}

const Header: React.FC<HeaderProps> = ({ className, clinicName, open }) => (
  <header className={`${className} ${styles.header}`}>
    <h1>{clinicName}</h1>
    {
      open
      ? <span className={styles.openIndicator}>Open</span>
      : <span className={styles.closedIndicator}>Closed</span>
    }
  </header>
);

export default Header;
