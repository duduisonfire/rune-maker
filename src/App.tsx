import React from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Routes from './routes';
import { Global } from './styles/globalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Global>
          <Sidebar />
          <Routes />
        </Global>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
