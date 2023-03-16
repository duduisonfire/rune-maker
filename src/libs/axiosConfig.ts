import axios from 'axios';
import ILockfileData from '../interfaces/ILockfileData';

class lolRequest {
  static async get(url: string) {
    const lockfileData = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;

    const responseResult = axios.get(url, {
      baseURL: `https://127.0.0.1:${lockfileData.port}`,
      auth: {
        username: 'riot',
        password: `${lockfileData.password}`,
      },
    });

    return responseResult;
  }
}

export default lolRequest;
