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
    window.api.setFile(localStorage.getItem('Lockfile'));
  }

  async getLockfileContent() {
    window.api.watch();
    const lockfileData = (await window.api.requestData()) as ILockfileData;
    return lockfileData;
  }

  async clientIsOpen() {
    const isOpen = (await window.api.isOpen()) as boolean;
    return isOpen;
  }

  watch() {
    window.api.watch();
  }

  openHandle() {
    window.api.openHandles();
  }

  openGithub() {
    window.api.openGithub();
  }
}
