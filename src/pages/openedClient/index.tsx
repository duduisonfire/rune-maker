import React, { useEffect, useState } from 'react';
import { MatchesContainer } from './styles/MatchesContainer';
import { useNavigate } from 'react-router-dom';
import { isOpen } from '../../libs/isOpen';
import lolClientApi from '../../libs/lolClientApi';
import ISummonerData from '../../interfaces/ISummonerData';
import MatchBox from '../../components/matchBox';
import IMatchesData from '../../interfaces/IMatchesData';
import IGameData from '../../interfaces/IGameData';
import lolExternalApi from '../../libs/lolExternalApi';

export default function OpenedClient(): JSX.Element {
  const [version, setVersion] = useState('');
  const navigate = useNavigate();
  const [summonerData, setSummonerData] = useState({} as ISummonerData);
  const [matchData, setMatchData] = useState({} as IMatchesData);

  useEffect(() => {
    const getLolVersion = async () => {
      const versionResponse = await lolExternalApi.getLolVersion();
      const version = versionResponse;
      setVersion(version);
    };

    const getSummonerData = async () => {
      const summonerDataResponse = await lolClientApi.requestSummonerData();
      const summonerData = summonerDataResponse;
      setSummonerData(summonerData);
    };

    const getMatchData = async () => {
      const matchDataResponse = await lolClientApi.requestMatchData();
      const matchData = matchDataResponse;
      setMatchData(matchData);
    };

    const isClosedListener = async () => {
      const closedLoop = setInterval(async () => {
        const isOpened = await isOpen();

        if (isOpened !== true) {
          navigate('/closed');
          clearInterval(closedLoop);
        }
      }, 507);
    };

    getLolVersion();

    if (!summonerData.accountId) {
      getSummonerData();
    }

    if (!matchData.accountId) {
      getMatchData();
    }

    isClosedListener();
  }, [summonerData.accountId, navigate, matchData]);

  return (
    <MatchesContainer>
      <div>
        <h6 className="text-lg text-white m-2">{summonerData.displayName}</h6>
      </div>
      <div className="h-[90%] overflow-auto">
        {matchData.accountId &&
          matchData.games.games.map((match: IGameData) => <MatchBox matchData={match} version={version} />)}
      </div>
    </MatchesContainer>
  );
}
