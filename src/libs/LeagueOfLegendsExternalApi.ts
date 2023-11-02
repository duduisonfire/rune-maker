import axios from 'axios';
import IChampionsObject from '../interfaces/IChampionsObject';
import { IAllRunes } from '../interfaces/IAllRunes';

export default abstract class LeagueOfLegendsExternalApi {
  static async getLolVersion() {
    const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
    const responseData = response.data as Array<string>;
    const version = responseData[0];
    return version;
  }

  static async getChampionName(champId: string, lolVersion: string) {
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lolVersion}/data/en_US/champion.json`);
    const championsObject = response.data.data as IChampionsObject;
    const championList = Object.keys(championsObject);
    let selectedChampion = '';

    championList.forEach((champion) => {
      if ((championsObject[champion].key as string) === champId) {
        selectedChampion = champion;
      }
    });

    return selectedChampion;
  }

  static async getAllRunes() {
    const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
    console.log('lolVersion', lolVersion);
    const response = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${lolVersion}/data/en_US/runesReforged.json`,
    );
    const responseData = response.data as IAllRunes[];
    return responseData;
  }
}
