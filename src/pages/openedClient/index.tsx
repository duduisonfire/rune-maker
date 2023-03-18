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
  const [matchesData, setMatchesData] = useState({} as IMatchesData);

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

    const getMatchesData = async () => {
      const matchDataResponse = await lolClientApi.requestMatchesData();
      const matchData = matchDataResponse;
      setMatchesData(matchData);
    };

    const pageListener = async () => {
      const inMatchLoop = window.setInterval(async () => {
        const matchResponse = await lolClientApi.getCurrentMatch();

        if (matchResponse !== undefined) {
          clearInterval(closedLoop);
          clearInterval(inMatchLoop);
          navigate('/inmatch');
        }
      }, 650);

      const closedLoop = window.setInterval(async () => {
        const isOpened = await isOpen();

        if (isOpened !== true) {
          clearInterval(inMatchLoop);
          clearInterval(closedLoop);
          navigate('/closed');
        }
      }, 307);
    };

    getLolVersion();

    if (!summonerData.accountId) {
      getSummonerData();
    }

    if (!matchesData.accountId) {
      getMatchesData();
    }

    pageListener();
  }, [summonerData.accountId, navigate, matchesData]);

  return (
    <MatchesContainer>
      <div>
        <h6 className="text-lg text-white m-2">{summonerData.displayName}</h6>
      </div>
      <div className="h-[90%] overflow-auto scroll-smooth">
        {matchesData.accountId && (
          <div>
            {matchesData.games.games.map((match: IGameData) => (
              <MatchBox matchData={match} version={version} />
            ))}
          </div>
        )}
      </div>
    </MatchesContainer>
  );
}
