import axios from 'axios';
import ILockfileData from '../interfaces/ILockfileData';

const lockfileData = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;

const lolRequest = axios.create({
  baseURL: `https://127.0.0.1:${lockfileData.port}`,
  auth: {
    username: 'riot',
    password: `${lockfileData.password}`,
  },
});

export default lolRequest;
