import React from 'react';
import styles from './ErrorWaitTime.css';

interface ErrorWaitTimeProps {
  errorMsg: string,
}

const ErrorWaitTime: React.FC<ErrorWaitTimeProps> = ({ errorMsg }) => (
  <div className={styles.errorWaitTime}>
    <p>An error occurred.</p>
    <pre>{errorMsg}</pre>
  </div>
);

export default ErrorWaitTime;
