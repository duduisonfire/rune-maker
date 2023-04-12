import IElectronApi from '../interfaces/IElectronApi';
import ILockfileData from '../interfaces/ILockfileData';

export default class ElectronApi implements IElectronApi {
  getLeagueOfLegendsPath(file: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    localStorage.setItem('Lockfile', file.files[0].path.replaceAll('LeagueClient.exe', 'lockfile'));
  }

  setLeagueOfLegendsPath() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.lockfile.setFile(localStorage.getItem('Lockfile'));
  }

  async getLockfileContent() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.lockfile.watch();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const lockfileData = (await window.lockfile.requestData()) as ILockfileData;
    return lockfileData;
  }

  async clientIsOpen() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const promise = (await window.lockfile.isOpen()) as boolean;
    return promise;
  }
}
