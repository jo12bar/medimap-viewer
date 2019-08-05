import * as React from 'react';

import * as styles from './Header.css';

const Header = ({ className }) => (
  <header className={`${className} ${styles.header}`}>
    <h1>💖 Hello World! <span className={styles.comicSans}>he he he he he he he he he</span></h1>
  </header>
);

export default Header;
