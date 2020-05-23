import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
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
  typography: { fontFamily: 'Hack, monospace' },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/play" component={PlayView} />
        <Route path="/" component={StartView} />
      </Switch>
    </Router>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
