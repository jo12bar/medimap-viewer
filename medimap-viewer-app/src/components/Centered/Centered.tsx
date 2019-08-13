import React from 'react';
import styles from './Centered.css';

interface CenteredProps {
  horizontally?: boolean,
  vertically?: boolean,
}

/**
 * Center child component in a parent container vertically, horizontally, or
 * both using flexbox.
 */
const Centered: React.FC<CenteredProps> = ({ horizontally = false, vertically = false, children }) => (
  <div
    className={[
      styles.centered,
      horizontally ? styles.horizontally : '',
      vertically ? styles.vertically : '',
    ].filter(s => s !== '').join(' ')}
  >
    {children}
  </div>
);

export default Centered;
