import './App.css';
import { Provider } from 'react-redux';

import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Birthdays from './components/birthdays';
import store from './store';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container sx={{ m: 2 }}>
          <Birthdays />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
