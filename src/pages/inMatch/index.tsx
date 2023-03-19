import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RuneRequest from '../../classes/runesWebScraper';
import { isOpen } from '../../libs/isOpen';
import lolClientApi from '../../libs/lolClientApi';
import { Container } from './styles/container';

export default function InMatch(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const getMatch = async () => {
      const matchLoop = window.setInterval(async () => {
        if (await isOpen()) {
          const matchResponse = await lolClientApi.inMatch();

          if (!matchResponse) {
            window.clearInterval(matchLoop);
            navigate('/closed');
          }
        } else {
          window.clearInterval(matchLoop);
          navigate('/closed');
        }
      }, 650);
    };

    //const RuneRequest = new RuneRequest();
    getMatch();
  });

  return (
    <Container>
      <h1 className="text-white">Em partida</h1>
    </Container>
  );
}
