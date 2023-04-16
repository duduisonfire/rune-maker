import React, { useEffect } from 'react';
import { Container } from './styles/container';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import LeagueOfLegendsClient from '../../libs/LeagueOfLegendsClient';
import ElectronApi from '../../libs/ElectronApi';

export default function ClosedClient(): JSX.Element {
  const navigate = useNavigate();
  const electron = new ElectronApi();

  const { data } = useQuery({
    queryKey: ['isClosed'],
    queryFn: async () => {
      const res = await electron.clientIsOpen();
      return res;
    },
    refetchInterval: 500,
  });

  useEffect(() => {
    const clientIsOpenListener = async () => {
      if (data) {
        const lockfileData = await electron.getLockfileContent();
        localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
        const lolClient = new LeagueOfLegendsClient(lockfileData);
        const handshakeRequest = await lolClient.LeagueOfLegendsClientInstance().get('/lol-login/v1/session');
        const clientIsTrulyOpened = handshakeRequest.status;

        if (clientIsTrulyOpened === 200) {
          window.setTimeout(() => {
            navigate('/open');
          }, 1000);
        }
      }
    };

    clientIsOpenListener();
  });

  return (
    <Container>
      <h1 className="text-white">Cliente Fechado</h1>
    </Container>
  );
}
