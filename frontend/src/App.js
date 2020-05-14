import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import StartView from './StartView';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#649568',
      main: '#149414',
      dark: '#0e6b0e',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseLine />
    <StartView />
  </ThemeProvider>
);

export default App;
