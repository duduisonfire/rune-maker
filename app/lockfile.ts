import { ipcMain, IpcMainEvent } from 'electron';
import fs from 'fs';

export class Lockfile {
  private lockfile: string[] = [];
  private path = '';
  private port = '';
  private password = '';

  watchFile() {
    if (fs.existsSync(this.path)) {
      const content = fs.readFileSync(this.path, 'utf-8');
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
      return fs.existsSync(this.path);
    });
  }

  setFile(event: IpcMainEvent, filepath: string) {
    this.path = filepath;
  }
}
