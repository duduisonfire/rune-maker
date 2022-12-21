import React from 'react';
import { Container } from './styles/container';
import { useNavigate } from 'react-router-dom';
import { isOpen } from '../../libs/isOpen';
import { Async } from 'react-async';
import requestSummonerData from './modules/requestSummonerData';

export default function OpenedClient(): JSX.Element {
  const navigate = useNavigate();

  const isClosedListener = async () => {
    const closedLoop = setInterval(async () => {
      const isOpened = await isOpen();

      if (isOpened !== true) {
        navigate('/closed');
        clearInterval(closedLoop);
      }
    }, 507);
  };

  return (
    <Async promiseFn={isClosedListener}>
      <Async promiseFn={requestSummonerData}>
        {({ data }) => {
          return (
            <Container>
              <h1>Cliente Aberto</h1>
              <h1>{data?.data.displayName}</h1>
              <h1>{data?.data.summonerId}</h1>
              <h1>{data?.data.accountId}</h1>
            </Container>
          );
        }}
      </Async>
    </Async>
  );
}
