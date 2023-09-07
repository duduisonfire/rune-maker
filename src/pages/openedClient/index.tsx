import React, { createRef, RefObject, useMemo, useState } from 'react';
import { MatchesContainer } from './styles/MatchesContainer';
import { useNavigate } from 'react-router-dom';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import ISummonerData from '../../interfaces/ISummonerData';
import MatchBox from '../../components/matchBox';
import IMatchesData from '../../interfaces/IMatchesData';
import IGameData from '../../interfaces/IGameData';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import { useQuery } from 'react-query';
import ILockfileData from '../../interfaces/ILockfileData';

export default function OpenedClient(): JSX.Element {
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
  const navigate = useNavigate();
  const [version, setVersion] = useState('');
  const [summonerData, setSummonerData] = useState({} as ISummonerData);
  const [matchesData, setMatchesData] = useState({} as IMatchesData);
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(lockfile), [lockfile]);
  const summonerNameElement: RefObject<HTMLDivElement> = createRef();
  const matchesElement: RefObject<HTMLDivElement> = createRef();

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['isClosed'],
      queryFn: async () => {
        const res = await lolClientApi.requestSummonerData();
        return res;
      },
      refetchInterval: 400,
    });
    const res2 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inChampionSelect();
        return res.data;
      },
      refetchInterval: 500,
    });
    useQuery({
      queryKey: ['firstRender'],
      queryFn: async () => {
        const res = await lolClientApi.requestSummonerData();
        const lolVersionToSet = await LeagueOfLegendsExternalApi.getLolVersion();
        setVersion(lolVersionToSet);
        const summonerDataResponse = await lolClientApi.requestSummonerData();
        setSummonerData(summonerDataResponse);
        const matchData = await lolClientApi.requestMatchesData();
        setMatchesData(matchData);

        return res;
      },
    });

    if (res1.status === 'error') navigate('/closed');
    if (res2.status === 'success') navigate('/inmatch');
  };

  QueryMultiple();

  return (
    <MatchesContainer>
      <div>
        <h6 ref={summonerNameElement} className="text-lg text-white m-2">
          {summonerData.displayName}
        </h6>
      </div>
      <div ref={matchesElement} className="h-[90%] overflow-auto scroll-smooth">
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
