import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
    <CssBaseLine />
    <Router>
      <Switch>
        <Route path="/play" component={PlayView} />
        <Route path="/" component={StartView} />
      </Switch>
    </Router>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
