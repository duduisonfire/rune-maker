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

    const PageListener = async () => {
      const closedLoop = window.setInterval(async () => {
        const isOpened = await isOpen();
        let inMatch = false;

        if (isOpened === true) {
          inMatch = await lolClientApi.inMatch();
        }

        if (inMatch) {
          window.clearInterval(closedLoop);
          navigate(`/inmatch/`);
        }

        if (isOpened !== true) {
          window.clearInterval(closedLoop);
          navigate('/closed');
        }
      }, 307);

      const summonerName = document.querySelector('#summoner-name');
      const matchesBox = document.querySelector('#matches-content');
      console.log(summonerName, matchesBox);

      if (matchesBox?.innerHTML === null || summonerName?.innerHTML === null) {
        window.clearInterval(closedLoop);
        setVersion(version);
      }
    };

    getLolVersion();

    if (!summonerData.accountId) {
      getSummonerData();
    }

    if (!matchesData.accountId) {
      getMatchesData();
    }

    PageListener();
  }, [summonerData.accountId, navigate, matchesData, version]);

  return (
    <MatchesContainer>
      <div>
        <h6 id="summoner-name" className="text-lg text-white m-2">
          {summonerData.displayName}
        </h6>
      </div>
      <div id="matches-content" className="h-[90%] overflow-auto scroll-smooth">
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
