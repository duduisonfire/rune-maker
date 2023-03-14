import ISummonerData from '../../../interfaces/ISummonerData';
import lolRequest from '../../../libs/axiosConfig';

const requestSummonerData = async () => {
  const response = await lolRequest.get('/lol-summoner/v1/current-summoner');
  const responseData = response.data as ISummonerData;
  return responseData;
};

export default requestSummonerData;
