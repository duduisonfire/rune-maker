/* eslint-disable @typescript-eslint/ban-ts-comment */
/* istanbul ignore file */
// @ts-nocheck

import IElectronApi from '../interfaces/IElectronApi';
import ILockfileData from '../interfaces/ILockfileData';

export default class ElectronApi implements IElectronApi {
  getLeagueOfLegendsPath(file: HTMLElement) {
    localStorage.setItem('Lockfile', file.files[0].path.replaceAll('LeagueClient.exe', 'lockfile'));
  }

  setLeagueOfLegendsPath() {
    window.lockfile.setFile(localStorage.getItem('Lockfile'));
  }

  async getLockfileContent() {
    window.lockfile.watch();
    const lockfileData = (await window.lockfile.requestData()) as ILockfileData;
    return lockfileData;
  }

  async clientIsOpen() {
    const isOpen = (await window.lockfile.isOpen()) as boolean;
    return isOpen;
  }

  watch() {
    window.lockfile.watch();
  }

  openHandle() {
    window.lockfile.openHandles();
  }
}
