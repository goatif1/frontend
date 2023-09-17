import { SnackbarProvider } from 'notistack';
import './App.css';
import AppRoutes from './router/AppRoutes';
import AccountContext from './public/contexts/AccountContext';
import { useState } from 'react';
import { ThemeProvider } from '@mui/styles';
import GlobalTheme from './styles/GlobalTheme';

function App() {
  const [account, setAccount] = useState(null);
  const value = { account, setAccount };

  return (
    <AccountContext.Provider value={value} sx={{width: '100%', height: '100%'}}>
      <SnackbarProvider>
        <ThemeProvider theme={GlobalTheme}>
          <AppRoutes/>
        </ThemeProvider>
      </SnackbarProvider>
    </AccountContext.Provider>
  );
}

export default App;
