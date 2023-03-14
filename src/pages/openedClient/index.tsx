import React, { useEffect, useState } from 'react';
import { Container } from './styles/container';
import { useNavigate } from 'react-router-dom';
import { isOpen } from '../../libs/isOpen';
import lolClientApi from '../../libs/lolClientApi';
import ISummonerData from '../../interfaces/ISummonerData';

export default function OpenedClient(): JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState({} as ISummonerData);

  useEffect(() => {
    const getSummonerData = async () => {
      const summonerData = await lolClientApi.requestSummonerData();
      setData(summonerData);
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

    if (!data.accountId) {
      getSummonerData();
    }

    isClosedListener();
  }, [data.accountId, navigate]);

  return (
    <Container>
      <h1>Cliente Aberto</h1>
      <h1>{data.displayName}</h1>
      <h1>{data.summonerId}</h1>
      <h1>{data.accountId}</h1>
    </Container>
  );
}
