import lolRequest from '../../../libs/axiosConfig';

const requestSummonerData = async () => {
  const response = await lolRequest.get('/lol-summoner/v1/current-summoner');
  return response;
};

export default requestSummonerData;
