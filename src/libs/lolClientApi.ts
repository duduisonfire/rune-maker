import ISummonerData from '../interfaces/ISummonerData';
import lolRequest from './axiosConfig';

export default abstract class lolClientApi {
  static async requestSummonerData() {
    const response = await lolRequest.get('/lol-summoner/v1/current-summoner');
    const responseData = response.data as ISummonerData;
    return responseData;
  }
}
