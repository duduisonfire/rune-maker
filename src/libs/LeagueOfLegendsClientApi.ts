import IMatchData from '../interfaces/IMatchesData';
import ISummonerData from '../interfaces/ISummonerData';
import IGetRunePage from '../interfaces/IGetRunePage';
import ICreateRunePage from '../interfaces/ICreateRunePage';
import { AxiosInstance } from 'axios';
import createLeagueOfLegendsAxiosInstance from './LeagueOfLegendsAxiosInstance';

class LeagueOfLegendsClientApi {
  constructor(private axios: AxiosInstance) {}

  static create() {
    return new LeagueOfLegendsClientApi(createLeagueOfLegendsAxiosInstance());
  }

  async requestSummonerData() {
    const response = await this.axios.get('/lol-summoner/v1/current-summoner');
    const responseData = response.data as ISummonerData;
    return responseData;
  }

  async requestMatchesData() {
    const response = await this.axios.get('/lol-match-history/v1/products/lol/current-summoner/matches');
    const responseData = response.data as IMatchData;
    return responseData;
  }

  async getCurrentRunePage(): Promise<IGetRunePage | void> {
    try {
      const response = await this.axios.get('/lol-perks/v1/currentpage/');
      const responseData = response.data as IGetRunePage;
      return responseData;
    } catch (error) {
      return error;
    }
  }

  async deleteCurrentRunePage(id: string) {
    await this.axios.delete(`/lol-perks/v1/pages/${id}/`);
  }

  async createCurrentRunePage(body: ICreateRunePage) {
    try {
      await this.axios.post('/lol-perks/v1/pages/', body);
      return true;
    } catch (error) {
      return false;
    }
  }

  async inMatch() {
    const response = await this.axios.get('/lol-champ-select/v1/session/');

    return response;
  }

  async currentChampion() {
    const response = await this.axios.get('/lol-champ-select/v1/current-champion/');

    return response;
  }
}

export default LeagueOfLegendsClientApi;
