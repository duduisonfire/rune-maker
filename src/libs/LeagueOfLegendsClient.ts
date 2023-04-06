import axios from 'axios';
import ILockfileData from '../interfaces/LockfileData';

export default function LeagueOfLegendsClient() {
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;

  return axios.create({
    baseURL: `https://127.0.0.1:${lockfile.port}`,
    auth: {
      username: 'riot',
      password: `${lockfile.password}`,
    },
  });
}
