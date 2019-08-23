import electron, { app, BrowserWindow, ipcMain } from 'electron';
import fetch from 'node-fetch';
import { updateMedimapData } from './medimap-data';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

/** Whether or not the application is running inside a balena container. */
const IS_BALENA = process.env.BALENA ? !!(parseInt(process.env.BALENA)) : false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: electron.BrowserWindow | null = null;

/**
 * The amount of time, in milliseconds, to wait before fetching more medimap data.
 */
const DATA_FETCH_DELAY = 0.5 * 60 * 1000;


const createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: IS_BALENA ? width : 800,
    height: IS_BALENA ? height : 600,
    frame: IS_BALENA ? false : true,
    title: 'medimap-viewer-app',
    kiosk: IS_BALENA ? true : false,

    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools when not running in balena.
  if (!IS_BALENA) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  setInterval(() => mainWindow && updateMedimapData(mainWindow), DATA_FETCH_DELAY);
  updateMedimapData(mainWindow);

  // Shutdowns in balena are weird - they use an http-based api. But we don't
  // want to shut down the computer when developing! So, when not on balena,
  // we'll just log out the command that would've otherwise been run.
  const balenaSuperviserAddress = IS_BALENA
    ? process.env.BALENA_SUPERVISER_ADDRESS
    : 'http://127.0.0.1:48484';
  const balenaSuperviserApiKey = IS_BALENA
    ? process.env.BALENA_SUPERVISER_API_KEY
    : 'SOME_API_KEY';
  const balenaRestartEndpoint = `${balenaSuperviserAddress}/v1/reboot?apikey=${balenaSuperviserApiKey}`;
  const balenaShutdownEndpoint = `${balenaSuperviserAddress}/v1/shutdown?apikey=${balenaSuperviserApiKey}`;

  ipcMain.on('restart-device', async () => {
    if (IS_BALENA) {
      console.log('Restarting device...');
      fetch(balenaRestartEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    }
    else {
      console.log('User tried to restart on a non-balena device. Would\'ve posted to:');
      console.log(balenaRestartEndpoint);
    }
  });

  ipcMain.on('shutdown-device', async () => {
    if (IS_BALENA) {
      console.log('Shutting down...');
      fetch(balenaShutdownEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    }
    else {
      console.log('User tried to shutdown on a non-balena device. Would\'ve posted to:');
      console.log(balenaShutdownEndpoint);
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

console.log(`Running in environment ${process.env.NODE_ENV}`);
