import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  setFile: (filepath: string) => ipcRenderer.send('lockfile', filepath),
  openHandles: () => ipcRenderer.send('openHandles'),
  watch: () => ipcRenderer.send('lockfileWatch'),
  requestData: () => ipcRenderer.invoke('requestData'),
  isOpen: () => ipcRenderer.invoke('isOpen'),
  openGithub: () => ipcRenderer.send('openGithub'),
});
