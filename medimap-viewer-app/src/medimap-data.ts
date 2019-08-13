import cheerio from 'cheerio';
import electron from 'electron';
import fetch from 'node-fetch';
import { CLINIC_ID } from './config';

export enum MedimapDataMsgTypes {
  CLOSED =      'MedimapClosedData',
  OPEN   =      'MedimapOpenData',
  AT_CAPACITY = 'MedimapAtCapacityData',
  ERROR  =      'MedimapErrorData',
}

export interface MedimapClosedData {
  type: MedimapDataMsgTypes.CLOSED,
}

export const isMedimapClosedData = (x: any): x is MedimapClosedData => (
  x.type === MedimapDataMsgTypes.CLOSED
);

export interface MedimapOpenData {
  type: MedimapDataMsgTypes.OPEN,
  waitTime: number,
  lastUpdated: string,
}

export const isMedimapOpenData = (x: any): x is MedimapOpenData => (
  x.type === MedimapDataMsgTypes.OPEN
);

export interface MedimapAtCapacityData {
  type: MedimapDataMsgTypes.AT_CAPACITY,
}

export interface MedimapErrorData {
  type: MedimapDataMsgTypes.ERROR,
  errorMsg: string,
}

export const isMedimapErrorData = (x: any): x is MedimapErrorData => (
  x.type === MedimapDataMsgTypes.ERROR
);

export type MedimapData = MedimapErrorData | MedimapClosedData | MedimapAtCapacityData | MedimapOpenData;

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
    };
    return medimapData;
  }

  // If it's closed, return an object saying so.
  if (availability === 'CLOSED') {
    const medimapData: MedimapClosedData = {
      type: MedimapDataMsgTypes.CLOSED,
    };
    return medimapData;
  }

  // At this point, we know for sure that availability === 'OPEN'. However,
  // there is an edge case for when the clinic is at capacity, and cannot accept
  // any more patients for the day. I can't tell if the text inside the widget
  // is constant in this case, and its a difficult case to test (due to its
  // relative rarity). However, we can check for the existence of a div with
  // the class .mm-widget-at-capacity.

  if ($('.mm-widget-at-capacity').length) {
    const medimapData: MedimapAtCapacityData = {
      type: MedimapDataMsgTypes.AT_CAPACITY,
    };
    return medimapData;
  }

  const waitTime = parseInt($('.mm-widget-minutes').text().trim());
  const lastUpdated = $('.mm-widget-updated-time').text().trim();

  const medimapData: MedimapOpenData = {
    type: MedimapDataMsgTypes.OPEN,
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
