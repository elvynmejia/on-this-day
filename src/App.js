import './App.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { Provider } from 'react-redux';

import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Birthdays from './components/birthdays';
import store from './store';

const queryClient = new QueryClient();

const App = ({ queryClient: queryClientProp } = {}) => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientProp || queryClient}>
        <ThemeProvider theme={theme}>
          <Container sx={{ m: 2 }}>
            <Birthdays />
          </Container>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
