import chokidar from 'chokidar';
import path from 'path';
import electron from 'electron';
import { fileWalk } from './util/fs-util';

/** Whether or not the application is running inside a balena container. */
const IS_BALENA = process.env.BALENA ? !!(parseInt(process.env.BALENA)) : false;

const DIR_TO_WATCH = IS_BALENA
  ? '/mnt/medimap-images'
  : path.resolve(process.cwd(), 'images-for-local-development/');

const IMAGES_REGEX = /\.(jpg|jpeg|png|webp|svg|gif)/i;

/**
 * Allows us to batch ipc calls. Needed because chokidar very rapidly sends out
 * 'add' events when setting up watches while starting up.
 */
let batchIpcSendTimeout: NodeJS.Timeout;

const sendIpcData = async (win: electron.BrowserWindow) => {
  try {
    const files = await fileWalk(DIR_TO_WATCH);
    const images = files.filter((f) => IMAGES_REGEX.test(f));
    console.log('Sending images list:');
    console.dir(images);
    win.webContents.send('images', images);
  }
  catch (err) {
    console.error(err);
  }
};

const updateImagesList = (_eventName: string, _fileName: string, win: electron.BrowserWindow) => {
  console.log(`images: ${_eventName}: ${_fileName}`);
  clearTimeout(batchIpcSendTimeout);
  batchIpcSendTimeout = setTimeout(() => sendIpcData(win), 10 * 1000);
};

/**
 * Watches for new (or removed) images, and sends updated file paths to the
 * renderer process via electron's ipc.
 *
 * If runnning in balena, this function watches /mnt/medimap-images.
 * Otherwise, it watches a folder called 'images-for-local-development' in the
 * current working directory.
 *
 * @param win The renderer process to send ipc messages to.
 */
const watchForImages = (win: electron.BrowserWindow) => {
  const watcher = chokidar.watch(DIR_TO_WATCH, {
    ignored: /README\.md/,
  });

  watcher.on('all', (e, fs) => updateImagesList(e, fs, win));
};

export default watchForImages;
