import React from 'react';

import styles from './Panel.css';

interface PanelTypes {
  className: string,
}

const Panel: React.FC<PanelTypes> = ({ children, className }) => (
  <section className={`${className} ${styles.panel}`}>
    {children}
  </section>
);

export default Panel;
