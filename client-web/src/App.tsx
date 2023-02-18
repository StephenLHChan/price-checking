import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Footer from './components/footer';
import theme from './themes';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
