import React from 'react';
import SelectFolder from '../../components/selectFolder';
import { Container } from './styles/container';
import ElectronApi from '../../libs/ElectronApi';

export default function Index(): JSX.Element {
  const electron = new ElectronApi();

  return (
    <Container>
      <SelectFolder electron={electron} />
    </Container>
  );
}
