import React, { useEffect } from 'react';
import { Container } from './styles/container';
import { isOpen } from '../../libs/isOpen';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import createAxiosInstance from '../../libs/AxiosConfig';

export default function ClosedClient(): JSX.Element {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['isClosed'],
    queryFn: async () => {
      const res = await isOpen();
      return res;
    },
    refetchInterval: 500,
  });

  useEffect(() => {
    const isOpenListener = async () => {
      if (data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.lockfile.watch();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const lockfileData = (await window.lockfile.requestData()) as ILockfileData;
        localStorage.setItem('lockfileData', JSON.stringify(lockfileData));

        const handshakeRequest = await createAxiosInstance().get('/lol-login/v1/session');
        const clientIsTrulyOpened = handshakeRequest.status;

        if (clientIsTrulyOpened === 200) {
          window.setTimeout(() => {
            navigate('/open');
          }, 1000);
        }
      }
    };

    isOpenListener();
  });

  return (
    <Container>
      <h1 className="text-white">Cliente Fechado</h1>
    </Container>
  );
}
