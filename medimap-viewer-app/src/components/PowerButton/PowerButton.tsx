import React from 'react';

import styles from './PowerButton.css';

const PowerButton = () => (
  <button className={styles.powerButton}>
    {/*
      * Power icon taken from i cons on the Noun Project, from their
      * collection Power Icons.
      * See https://thenounproject.com/iconsguru/uploads/?i=714768
      */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502.18 512.005">
      <path d="M121.753 111.815a26.855 26.855 0 0 0-35.22-40.55 251.09 251.09 0 1 0 327.58-1.32 26.853 26.853 0 1 0-34.89 40.83 197.24 197.24 0 0 1 69.23 150.13c0 108.84-88.55 197.39-197.39 197.39-108.84 0-197.34-88.54-197.34-197.38a197.4 197.4 0 0 1 68.03-149.1z"/>
      <path d="M277.963 277.725V26.855a26.855 26.855 0 1 0-53.71 0v250.87a26.855 26.855 0 1 0 53.71 0z"/>
    </svg>
  </button>
);

export default PowerButton;
