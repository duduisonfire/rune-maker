import IMatchesData from '../interfaces/IMatchesData';
import ISummonerData from '../interfaces/ISummonerData';
import IGetRunePage from '../interfaces/IGetRunePage';
import ICreateRunePage from '../interfaces/ICreateRunePage';
import { AxiosInstance } from 'axios';
import LeagueOfLegendsClient from './LeagueOfLegendsClient';
import ILockfileData from '../interfaces/ILockfileData';
import IChampionSelectRequest from '../interfaces/IChampionSelectRequest';

class LeagueOfLegendsClientApi {
  constructor(private LeagueOfLegendsClient: AxiosInstance) {}

  static create(lockfile: ILockfileData) {
    const lolClient = new LeagueOfLegendsClient(lockfile).LeagueOfLegendsClientInstance();

    return new LeagueOfLegendsClientApi(lolClient);
  }

  async handshakeRequest() {
    try {
      await this.LeagueOfLegendsClient.get('/lol-login/v1/session');
      return true;
    } catch (error) {
      return false;
    }
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
    const responseData = response.data as IMatchesData;
    return responseData;
  }

  async getCurrentRunePage(): Promise<IGetRunePage | Error> {
    try {
      const response = await this.LeagueOfLegendsClient.get('/lol-perks/v1/currentpage/');
      const responseData = response.data as IGetRunePage;
      return responseData;
    } catch (error) {
      return error as Error;
    }
  }

  async deleteCurrentRunePage(id: number) {
    try {
      await this.LeagueOfLegendsClient.delete(`/lol-perks/v1/pages/${id}/`);
      return true;
    } catch (error) {
      return false;
    }
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

  getLane(championSelectStage: IChampionSelectRequest) {
    const team = championSelectStage.myTeam;
    let lane = '';

    for (let index = 0; index < team.length; index++) {
      if (championSelectStage.localPlayerCellId === team[index].cellId) {
        lane = team[index].assignedPosition;
      }
    }

    return lane;
  }

  getChampionId(match: IChampionSelectRequest) {
    for (let index = 0; index < match.myTeam.length; index++) {
      if (match.localPlayerCellId === match.myTeam[index].cellId) {
        return match.myTeam[index].championId;
      }
    }

    return 0;
  }

  // async getPlayer(id: number) {
  //   return await this.LeagueOfLegendsClient.get(`/lol-champ-select/v1/summoners/${id}`);
  // }
}

export default LeagueOfLegendsClientApi;
