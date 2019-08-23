import React from 'react';
import { MenuList, MenuItem, ChosenEvent } from 'react-menu-list';

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

const PowerButtonMenu = () => (
  <div className={styles.dropdown}>
    <MenuList>
      <PowerButtonMenuItem>Restart</PowerButtonMenuItem>
      <PowerButtonMenuItem>Shutdown</PowerButtonMenuItem>
    </MenuList>
  </div>
);

export default PowerButtonMenu;
