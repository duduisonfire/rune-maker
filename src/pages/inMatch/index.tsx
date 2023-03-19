import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RuneRequest from '../../classes/runesWebScraper';
import lolClientApi from '../../libs/lolClientApi';
import { Container } from './styles/container';

export default function InMatch(): JSX.Element {
  const navigate = useNavigate();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['inMatchPage'],
    queryFn: async () => {
      const res = await lolClientApi.inMatch();
      return res.data;
    },
    refetchInterval: 500,
  });

  useEffect(() => {
    if (status === 'error') {
      navigate('/closed');
    }
  });

  return (
    <Container>
      <h1 className="text-white">Em partida</h1>
    </Container>
  );
}
