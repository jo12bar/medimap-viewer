import cheerio from 'cheerio';
import electron from 'electron';
import fetch from 'node-fetch';
import { CLINIC_ID } from './config';

export enum MedimapDataMsgTypes {
  CLOSED = 'MedimapClosedData',
  OPEN   = 'MedimapOpenData',
  ERROR  = 'MedimapErrorData',
}

export interface MedimapClosedData {
  type: MedimapDataMsgTypes.CLOSED,
  open: false,
}

export interface MedimapOpenData {
  type: MedimapDataMsgTypes.OPEN,
  open: true,
  waitTime: number,
  lastUpdated: string,
}

export interface MedimapErrorData {
  type: MedimapDataMsgTypes.ERROR,
  errorMsg: string,
}

export type MedimapData = MedimapErrorData | MedimapClosedData | MedimapOpenData;

if (process.env.MEDIMAP_CLINIC_ID === undefined) {
  console.error('The environment variable MEDIMAP_CLINIC_ID was not set.')
  console.error('Set MEDIMAP_CLINIC_ID to the id of this display\'s clinic!');
  process.exit(1);
}

/**
 * Fetch medimap data from the widget, parse it to extract availability and wait
 * times, and return it.
 * @return Some sort of MedimapData object (either a MedimapErrorData, a
 *         MedimapClosedData, or a MedimapOpenData).
 */
export const getMedimapData = async (): Promise<MedimapData> => {
  const res = await fetch(
    `https://classic.medimap.ca/clinics/widgetdata/${CLINIC_ID}.json`
  );
  const data = await res.json();

  const $ = cheerio.load(data.html, { decodeEntities: false });

  // Check to see if the clinic is open or closed.
  const availability = $('.mm-widget-header-availability')
    .text()
    .toUpperCase()
    .trim();

  // If it's neither, or maybe the availability HTML node wasn't found, then
  // return an error object early.
  if ((availability !== 'OPEN') && (availability !== 'CLOSED')) {
    const medimapData: MedimapErrorData = {
      type: MedimapDataMsgTypes.ERROR,
      errorMsg: `Could not determine availability (availability === ${availability})`,
    }
    return medimapData;
  }

  // If it's closed, return an object saying so.
  if (availability === 'CLOSED') {
    const medimapData: MedimapClosedData = {
      type: MedimapDataMsgTypes.CLOSED,
      open: false,
    }
    return medimapData;
  }

  const waitTime = parseInt($('.mm-widget-minutes').text().trim());
  const lastUpdated = $('.mm-widget-updated-time').text().trim();

  const medimapData: MedimapOpenData = {
    type: MedimapDataMsgTypes.OPEN,
    open: true,
    waitTime,
    lastUpdated,
  };

  // TODO: Do error handeling properly.
  return medimapData;
};

/**
 * Get medimap data (via `getMedimapData`) and send it to a window via ipc.
 * @param  win The electron BrowserWindow to send updated data to.
 * @return     The success/ fail promise.
 */
export const updateMedimapData = async (win: electron.BrowserWindow) => {
  const data = await getMedimapData();

  console.log(`main is sending:`);
  console.dir(data);
  console.log('');
  win.webContents.send('medimap-new-data', data);
};
