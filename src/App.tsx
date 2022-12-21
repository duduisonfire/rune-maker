import React from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Routes from './routes';
import { Global } from './styles/globalStyle';

function App() {
  return (
    <HashRouter>
      <Global>
        <Sidebar />
        <Routes />
      </Global>
    </HashRouter>
  );
}

export default App;
