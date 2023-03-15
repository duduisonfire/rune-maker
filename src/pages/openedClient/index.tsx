import React, { useEffect, useState } from 'react';
import { Container } from './styles/container';
import { useNavigate } from 'react-router-dom';
import { isOpen } from '../../libs/isOpen';
import lolClientApi from '../../libs/lolClientApi';
import ISummonerData from '../../interfaces/ISummonerData';
import MatchBox from '../../components/matchBox';
import IMatchesData from '../../interfaces/IMatchesData';
import IGameData from '../../interfaces/IGameData';

export default function OpenedClient(): JSX.Element {
  const navigate = useNavigate();
  const [summonerData, setSummonerData] = useState({} as ISummonerData);
  const [matchData, setMatchData] = useState({} as IMatchesData);

  useEffect(() => {
    const getSummonerData = async () => {
      const summonerData = await lolClientApi.requestSummonerData();
      setSummonerData(summonerData);
    };

    const getMatchData = async () => {
      const matchData = await lolClientApi.requestMatchData();
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

    if (!summonerData.accountId) {
      getSummonerData();
    }

    if (!matchData.accountId) {
      getMatchData();
    }

    isClosedListener();
  }, [summonerData.accountId, navigate, matchData]);

  return (
    <Container>
      <div>
        <h6 className="text-lg text-white m-2">{summonerData.displayName}</h6>
      </div>
      {matchData.accountId &&
        matchData.games.games.map((match: IGameData) => (
          <div>
            <MatchBox matchData={match} />
          </div>
        ))}
    </Container>
  );
}
