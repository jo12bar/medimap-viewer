import React from 'react';
import { MenuList, MenuItem, ChosenEvent } from 'react-menu-list';
import { ipcRenderer } from 'electron';

import styles from './PowerButtonMenu.css';

interface PowerButtonMenuItemProps {
  onItemChosen?: (e: ChosenEvent) => void,
}

const PowerButtonMenuItem: React.FC<PowerButtonMenuItemProps> = ({ children, onItemChosen }) => (
  <MenuItem
    className={styles.menuItem}
    highlightedClassName={styles.menuItemHighlighted}
    onItemChosen={onItemChosen}
  >
    {children}
  </MenuItem>
);

const onRestartChosen = () => ipcRenderer.send('restart-device');
const onShutdownChosen = () => ipcRenderer.send('shutdown-device');

const PowerButtonMenu = () => (
  <div className={styles.dropdown}>
    <MenuList>
      <PowerButtonMenuItem onItemChosen={onRestartChosen}>Restart</PowerButtonMenuItem>
      <PowerButtonMenuItem onItemChosen={onShutdownChosen}>Shutdown</PowerButtonMenuItem>
    </MenuList>
  </div>
);

export default PowerButtonMenu;
