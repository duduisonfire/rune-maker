import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RuneRequest from '../../classes/runesWebScraper';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';
import lolClientApi from '../../libs/lolClientApi';
import lolExternalApi from '../../libs/lolExternalApi';
import { Container } from './styles/container';

export default function InMatch(): JSX.Element {
  const navigate = useNavigate();
  const [champion, setChampion] = useState('Choose champion');
  const [lolVersion, setLolVersion] = useState('');

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
      refetchInterval: 500,
    });
    return [res1, res2];
  };

  const [{ status }, { data: match }] = QueryMultiple();

  useEffect(() => {
    if (status === 'error') {
      navigate('/closed');
    }
  });

  useEffect(() => {
    const getLolVersion = async () => {
      const lolVersion = await lolExternalApi.getLolVersion();
      setLolVersion(lolVersion);
    };

    getLolVersion();
  });

  useEffect(() => {
    const championSelect = match?.data as IChampionSelectRequest;
    const getChampionName = async () => {
      const champion = await lolExternalApi.getChampionName(
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
