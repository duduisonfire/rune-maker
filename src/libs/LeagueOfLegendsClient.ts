import axios from 'axios';
import ILockfileData from '../interfaces/ILockfileData';

export default class LeagueOfLegendsClient {
  constructor(public lockfile: ILockfileData) {}

  LeagueOfLegendsClientInstance() {
    return axios.create({
      baseURL: `https://127.0.0.1:${this.lockfile.port}`,
      auth: {
        username: 'riot',
        password: `${this.lockfile.password}`,
      },
    });
  }
}
