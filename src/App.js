import { SnackbarProvider } from 'notistack';
import './App.css';
import AppRoutes from './router/AppRoutes';
import AccountContext from './public/contexts/AccountContext';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState(null);
  const value = { account, setAccount };

  return (
    <AccountContext.Provider value={value} sx={{width: '100%', height: '100%'}}>
      <SnackbarProvider>
        <AppRoutes/>
      </SnackbarProvider>
    </AccountContext.Provider>
  );
}

export default App;
