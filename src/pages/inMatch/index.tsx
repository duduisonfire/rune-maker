import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RuneWebScrap from '../../libs/runesWebScrap';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import { Container } from './styles/container';

export default function InMatch(): JSX.Element {
  const navigate = useNavigate();
  const [champion, setChampion] = useState('Choose champion');
  const [lolVersion, setLolVersion] = useState('');
  const lolClientApi = LeagueOfLegendsClientApi.create();

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['isClosed'],
      queryFn: async () => {
        const res = await lolClientApi.inMatch();
        return res;
      },
      refetchInterval: 500,
    });
    const res2 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inMatch();
        return res;
      },
      refetchInterval: 300,
    });
    return [res1, res2];
  };

  const [{ status: test }, { status, data: match }] = QueryMultiple();

  useEffect(() => {
    if (status === 'error') {
      navigate('/closed');
    }
  });

  useEffect(() => {
    const getLolVersion = async () => {
      const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
      setLolVersion(lolVersion);
    };

    getLolVersion();
  });

  useEffect(() => {
    const championSelect = match?.data as IChampionSelectRequest;
    const getChampionName = async () => {
      const champion = await LeagueOfLegendsExternalApi.getChampionName(
        championSelect.actions[0][0].championId.toString(),
        lolVersion,
      );

      setChampion(champion);
    };

    getChampionName();
  }, [match?.data, lolVersion]);

  return (
    <Container>
      <h1 className="text-white">{champion}</h1>
    </Container>
  );
}
