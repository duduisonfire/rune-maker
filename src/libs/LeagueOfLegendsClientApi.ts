import IMatchData from '../interfaces/IMatchesData';
import ISummonerData from '../interfaces/ISummonerData';
import IGetRunePage from '../interfaces/IGetRunePage';
import ICreateRunePage from '../interfaces/ICreateRunePage';
import { AxiosInstance } from 'axios';
import LeagueOfLegendsClient from './LeagueOfLegendsClient';
import ILockfileData from '../interfaces/ILockfileData';

class LeagueOfLegendsClientApi {
  constructor(private LeagueOfLegendsClient: AxiosInstance) {}

  static create() {
    const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
    const lolClient = new LeagueOfLegendsClient(lockfile).LeagueOfLegendsClientInstance();

    return new LeagueOfLegendsClientApi(lolClient);
  }

  async requestSummonerData() {
    const response = await this.LeagueOfLegendsClient.get('/lol-summoner/v1/current-summoner');
    const responseData = response.data as ISummonerData;
    return responseData;
  }

  async requestMatchesData() {
    const response = await this.LeagueOfLegendsClient.get(
      '/lol-match-history/v1/products/lol/current-summoner/matches',
    );
    const responseData = response.data as IMatchData;
    return responseData;
  }

  async getCurrentRunePage(): Promise<IGetRunePage | void> {
    try {
      const response = await this.LeagueOfLegendsClient.get('/lol-perks/v1/currentpage/');
      const responseData = response.data as IGetRunePage;
      return responseData;
    } catch (error) {
      return error;
    }
  }

  async deleteCurrentRunePage(id: string) {
    await this.LeagueOfLegendsClient.delete(`/lol-perks/v1/pages/${id}/`);
  }

  async createCurrentRunePage(body: ICreateRunePage) {
    try {
      await this.LeagueOfLegendsClient.post('/lol-perks/v1/pages/', body);
      return true;
    } catch (error) {
      return false;
    }
  }

  async inChampionSelect() {
    const response = await this.LeagueOfLegendsClient.get('/lol-champ-select/v1/session/');

    return response;
  }

  async currentChampion() {
    const response = await this.LeagueOfLegendsClient.get('/lol-champ-select/v1/current-champion/');

    return response;
  }
}

export default LeagueOfLegendsClientApi;
