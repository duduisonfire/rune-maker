import axios from 'axios';
import IRunePage from '../interfaces/IRunePage';

export default class GetRunesApi {
  axiosInstance = axios.create({
    baseURL: 'http://51.161.70.66:5000/api/ugg/',
  });

  async getChampionRunes(champion: string, lane: string) {
    try {
      const championRunes = (await this.axiosInstance.get(`${champion}/${lane}`)).data as IRunePage;

      return championRunes;
    } catch (error) {
      const championRunes = (await this.getChampionRunes(champion, lane)) as IRunePage;

      return championRunes;
    }
  }
}
