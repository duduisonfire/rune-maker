import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { Lockfile } from './lockfile';

const lockfile = new Lockfile();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: '../poro.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload', 'preload.js'),
    },
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    autoHideMenuBar: true,
  });

  win.loadFile(path.resolve(__dirname, '..', 'build', 'index.html'));
};

app.whenReady().then(() => {
  ipcMain.on('lockfile', lockfile.setFile);
  ipcMain.on('lockfileWatch', lockfile.watchFile);
  ipcMain.on('openHandles', lockfile.openHandles);
  ipcMain.on('openGithub', () => {
    shell.openExternal('https://github.com/duduisonfire/rune-maker');
  });
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault();
  callback(true);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
