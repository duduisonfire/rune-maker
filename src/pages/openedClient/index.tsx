import React, { useEffect, useMemo, useState } from 'react';
import { MatchesContainer } from './styles/MatchesContainer';
import { useNavigate } from 'react-router-dom';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import ISummonerData from '../../interfaces/ISummonerData';
import MatchBox from '../../components/matchBox';
import IMatchesData from '../../interfaces/IMatchesData';
import IGameData from '../../interfaces/IGameData';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import { useQuery } from 'react-query';

export default function OpenedClient(): JSX.Element {
  const navigate = useNavigate();
  const [version, setVersion] = useState('');
  const [summonerData, setSummonerData] = useState({} as ISummonerData);
  const [matchesData, setMatchesData] = useState({} as IMatchesData);
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(), []);

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['isClosed'],
      queryFn: async () => {
        const res = await lolClientApi.requestSummonerData();
        return res;
      },
      refetchInterval: 500,
    });
    const res2 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inMatch();
        return res.data;
      },
      refetchInterval: 500,
    });
    return [res1, res2];
  };

  const [{ status: toClose }, { status: toMatch }] = QueryMultiple();

  useEffect(() => {
    const getLolVersion = async () => {
      const versionResponse = await LeagueOfLegendsExternalApi.getLolVersion();
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

    getLolVersion();
    getSummonerData();
    getMatchesData();

    const summonerNameElement = document.querySelector('#summoner-name');
    const matchesElement = document.querySelector('#matches-content');

    if (summonerNameElement?.innerHTML === '' || matchesElement?.innerHTML === '') {
      getLolVersion();
    }
  }, [lolClientApi, matchesData.accountId, summonerData.accountId]);

  useEffect(() => {
    if (toClose === 'error') {
      navigate('/closed');
    }
  }, [navigate, toClose]);

  useEffect(() => {
    if (toMatch === 'success') {
      navigate('/inmatch');
    }
  }, [navigate, toMatch]);

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
              <MatchBox version={version} player={match.participants[0]} />
            ))}
          </div>
        )}
      </div>
    </MatchesContainer>
  );
}
