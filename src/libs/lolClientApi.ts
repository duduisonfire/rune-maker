import IMatchData from '../interfaces/IMatchesData';
import ISummonerData from '../interfaces/ISummonerData';
import lolRequest from './axiosConfig';
import IGetRunePage from '../interfaces/IGetRunePage';
import ICreateRunePage from '../interfaces/ICreateRunePage';

export default abstract class lolClientApi {
  static async requestSummonerData() {
    const response = await lolRequest.get('/lol-summoner/v1/current-summoner');
    const responseData = response.data as ISummonerData;
    return responseData;
  }

  static async requestMatchData() {
    const response = await lolRequest.get('/lol-match-history/v1/products/lol/current-summoner/matches');
    const responseData = response.data as IMatchData;
    return responseData;
  }

  static async getCurrentRunePage(): Promise<IGetRunePage | void> {
    try {
      const response = await lolRequest.get('/lol-perks/v1/currentpage/');
      const responseData = response.data as IGetRunePage;
      return responseData;
    } catch (error) {
      return;
    }
  }

  static async createCurrentRunePage(body: ICreateRunePage) {
    try {
      await lolRequest.post('/lol-perks/v1/pages/', body);
      return true;
    } catch (error) {
      return false;
    }
  }
}
