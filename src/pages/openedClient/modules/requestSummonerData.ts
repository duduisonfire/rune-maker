import lolRequest from '../../../libs/axiosConfig';

const requestSummonerData = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const response = await lolRequest.get('/lol-summoner/v1/current-summoner');
  return response;
};

export default requestSummonerData;
