import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import StartView from './StartView';
import PlayView from './PlayView';

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
    <Router>
      <Switch>
        <Route path="/play" component={PlayView} />
        <Route path="/" component={StartView} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
