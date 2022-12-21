import React from 'react';
import SelectFolder from '../../components/selectFolder';
import { Container } from './styles/container';

export default function Index(): JSX.Element {
  return (
    <Container>
      <SelectFolder />
    </Container>
  );
}
