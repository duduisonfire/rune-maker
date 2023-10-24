import React from 'react';
import SelectFolder from '../../components/selectFolder';
import { Container } from './styles/container';
import ElectronApi from '../../libs/ElectronApi';

export default function Index(): JSX.Element {
  const electron = new ElectronApi();

  return (
    <Container>
      <img src="./imgs/unknown-poro.png" alt="No file selected." width={300} height={300} />
      <div>
        <h4 className="text-white m-8">Select "LeagueClient.exe" file in your League of Legends folder.</h4>
      </div>
      <SelectFolder electron={electron} />
    </Container>
  );
}
