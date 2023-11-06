import React, { useState } from 'react';
import { Container } from './styles/container';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import ElectronApi from '../../libs/ElectronApi';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';

export default function ClosedClient(): JSX.Element {
  const queryClient = useQueryClient();
  const [clientIsOpen, setClientIsOpen] = useState(false);
  const [create, setCreate] = useState<LeagueOfLegendsClientApi | null>(null);
  const navigate = useNavigate();
  const electron = new ElectronApi();

  useQuery({
    queryKey: ['lockfile'],
    queryFn: async () => {
      await electron.clientIsOpen();
      const lockfile = await electron.getLockfileContent();
      localStorage.setItem('lockfileData', JSON.stringify(lockfile));
      const lolClient = LeagueOfLegendsClientApi.create(lockfile);
      setCreate(lolClient);
    },
  });

  useQuery({
    queryKey: ['clientIsOpen', create],
    queryFn: async () => {
      if (create) {
        const handshake = await create.handshakeRequest();
        setClientIsOpen(handshake);
      }
    },
    refetchInterval: clientIsOpen ? false : 1000,
  });

  if (clientIsOpen) navigate('/open');
  if (!clientIsOpen) queryClient.invalidateQueries(['lockfile', 'clientIsOpen', create]);

  return (
    <Container>
      <img src="./imgs/sad-poro.png" alt="No file selected." width={300} height={300} />
      <h1 className="text-white text-2xl m-12">Client is Closed</h1>
    </Container>
  );
}
