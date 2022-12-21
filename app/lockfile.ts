import { ipcMain, IpcMainEvent } from 'electron';
import fs from 'fs';

export class Lockfile {
  clientIsOpen = false;
  lockfile: string[] = [];
  pathfile = '';
  port = '';
  password = '';

  watchFile() {
    if (fs.existsSync(this.pathfile)) {
      this.clientIsOpen = true;
      const content = fs.readFileSync(this.pathfile, 'utf-8');
      this.lockfile = content.split(':');
      this.port = this.lockfile[2];
      this.password = this.lockfile[3];
    }
  }

  openHandles() {
    ipcMain.handle('requestData', () => {
      return { port: this.port, password: this.password };
    });

    ipcMain.handle('isOpen', () => {
      return fs.existsSync(this.pathfile);
    });
  }

  setFile(event: IpcMainEvent, filepath: string) {
    this.pathfile = filepath;
  }
}
