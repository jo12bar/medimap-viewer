import React from 'react';

/**
 * Gets the display name of the passed-in React component. Should work for all
 * types of components.
 * @param Component The react component to get the display name of.
 * @return The display name of the component, or 'Component' if the display name
 *         could not be determined.
 */
export function getDisplayName<T>(Component: React.ComponentType<T>) {
  return Component.displayName || Component.name || 'Component';
}
