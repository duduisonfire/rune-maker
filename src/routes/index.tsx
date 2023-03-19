import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClosedClient from '../pages/closedClient';
import Index from '../pages/index';
import InMatch from '../pages/inMatch';
import OpenedClient from '../pages/openedClient';
import ClientIsOpened from './modules/clientIsOpened';
import HaveFolder from './modules/haveFolder';

export default function AllRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HaveFolder />}>
        <Route path="/" element={<Index />} />
      </Route>
      <Route path="/closed" element={<ClientIsOpened />}>
        <Route path="/closed" element={<ClosedClient />} />
      </Route>
      <Route path="/open" element={<OpenedClient />} />
      <Route path="/inmatch/" element={<InMatch />} />
    </Routes>
  );
}
