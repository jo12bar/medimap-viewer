import electron from 'electron';
import fetch from 'node-fetch';
import { CLINIC_ID } from './config';

if (process.env.MEDIMAP_CLINIC_ID === undefined) {
  console.error('The environment variable MEDIMAP_CLINIC_ID was not set.')
  console.error('Set MEDIMAP_CLINIC_ID to the id of this display\'s clinic!');
  process.exit(1);
}

export const getMedimapData = async (): Promise<string> => {
  const res = await fetch(`https://classic.medimap.ca/clinics/widgetdata/${CLINIC_ID}.json`);
  const data = await res.json();

  // TODO: Parse data properly.
  // TODO: Do error handeling properly.
  return data.html;
};

/**
 * Get medimap data (via `getMedimapData`) and send it to a window via ipc.
 * @param  win The electron BrowserWindow to send updated data to.
 * @return     The success/ fail promise.
 */
export const updateMedimapData = async (win: electron.BrowserWindow) => {
  const data = await getMedimapData();

  console.log(`main is sending: ${data}`);
  win.webContents.send('medimap-new-data', data);
};
