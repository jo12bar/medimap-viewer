import React from 'react';

import styles from './Header.css';

interface HeaderProps {
  className: string,
}

const Header: React.FC<HeaderProps> = ({ className }) => (
  <header className={`${className} ${styles.header}`}>
    <h1>💖 Hello World! <span className={styles.comicSans}>he he he he he he he he he</span></h1>
  </header>
);

export default Header;
