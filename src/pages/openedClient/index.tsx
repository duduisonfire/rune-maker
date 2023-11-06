import React, { createRef, RefObject, useMemo, useState } from 'react';
import { MatchesContainer } from './styles/MatchesContainer';
import { useNavigate } from 'react-router-dom';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import ISummonerData from '../../interfaces/ISummonerData';
import MatchBox from '../../components/matchBox';
import IMatchesData from '../../interfaces/IMatchesData';
import IGameData from '../../interfaces/IGameData';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import { useQuery, useQueryClient } from 'react-query';
import ILockfileData from '../../interfaces/ILockfileData';

export default function OpenedClient(): JSX.Element {
  const queryClient = useQueryClient();
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
  const navigate = useNavigate();
  const [version, setVersion] = useState('');
  const [summonerData, setSummonerData] = useState({} as ISummonerData);
  const [matchesData, setMatchesData] = useState({} as IMatchesData);
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(lockfile), [lockfile]);
  const summonerNameElement: RefObject<HTMLDivElement> = createRef();
  const matchesElement: RefObject<HTMLDivElement> = createRef();

  useQuery({
    queryKey: ['clientClosed'],
    queryFn: async () => {
      await lolClientApi.requestSummonerData();
    },
    onError: () => {
      queryClient.invalidateQueries(['clientIsOpen', 'lockfile']);
      navigate('/closed');
    },
    refetchInterval: 10000,
  });

  useQuery({
    queryKey: ['inMatch'],
    queryFn: async () => {
      const res = await lolClientApi.inChampionSelect();
      return res.data;
    },
    refetchInterval: 500,
    onSuccess: () => {
      queryClient.invalidateQueries(['matchData']);
      navigate('/inmatch');
    },
  });

  useQuery({
    queryKey: ['lolVersion'],
    queryFn: async () => {
      const lolVersionToSet = await LeagueOfLegendsExternalApi.getLolVersion();
      setVersion(lolVersionToSet);
    },
  });

  useQuery({
    queryKey: ['matchData'],
    queryFn: async () => {
      const matchData = await lolClientApi.requestMatchesData();
      setMatchesData(matchData);
    },
  });

  useQuery({
    queryKey: ['allChampions', { version }],
    queryFn: async () => {
      const champions = await LeagueOfLegendsExternalApi.getAllChampions();
      localStorage.setItem('allChampions', JSON.stringify(champions));
    },
  });

  useQuery({
    queryKey: ['allItems', { version }],
    queryFn: async () => {
      const items = await LeagueOfLegendsExternalApi.getAllItems();
      localStorage.setItem('allItems', JSON.stringify(items));
    },
  });

  useQuery({
    queryKey: ['summonerData'],
    queryFn: async () => {
      const summonerData = await lolClientApi.requestSummonerData();
      setSummonerData(summonerData);
    },
  });

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
