import { SnackbarProvider } from 'notistack';
import './App.css';
import PublicHomePage from './public/pages/PublicHomePage';

function App() {
  return (
    <SnackbarProvider>
      <PublicHomePage />
    </SnackbarProvider>
  );
}

export default App;
