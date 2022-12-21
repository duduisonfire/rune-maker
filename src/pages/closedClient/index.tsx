import React from 'react';
import { Container } from './styles/container';
import { Async } from 'react-async';
import { isOpen } from '../../libs/isOpen';
import { useNavigate } from 'react-router-dom';
import ILockfileData from '../../interfaces/ILockfileData';

export default function ClosedClient(): JSX.Element {
  const navigate = useNavigate();

  const isOpenListener = async () => {
    const openLoop = setInterval(async () => {
      const isOpened = await isOpen();

      if (isOpened) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.lockfile.watch();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const lockfileData = (await window.lockfile.requestData()) as ILockfileData;
        localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
        navigate('/open');
        clearInterval(openLoop);
      }
    }, 507);
  };

  return (
    <Async promiseFn={isOpenListener}>
      <Container>
        <h1>Cliente Fechado</h1>
      </Container>
    </Async>
  );
}
