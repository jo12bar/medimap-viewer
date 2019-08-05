import * as React from 'react';

import * as styles from './Panel.css';

const Panel = ({ children, className, ...props }) => (
  <section className={`${className} ${styles.panel}`} {...props}>
    {children}
  </section>
);

export default Panel;
