import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from './themes';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
