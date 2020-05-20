import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import request from 'superagent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import BotUploader from './BotUploader';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  container: {
    textAlign: 'center',
    marginTop: '4%',
    marginBottom: '4%',
  },
  title: {
    fontSize: '80px',
    color: theme.palette.primary.main,
  },
}));

function BotSelector({ title, options, value, onChange }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function StartView() {
  const history = useHistory();
  const classes = useStyles();
  const [botOne, selectBotOne] = useState('');
  const [botTwo, selectBotTwo] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    request
      .get('https://wasm-bots.herokuapp.com/bots')
      .then(res => res.body.map(({ name }) => name))
      .then(options => setOptions(['human', ...options]))
      .catch(e => console.log(e));
  }, []);

  return (
    <Grid container style={{ marginTop: '5%' }}>
      <Container maxWidth="md" className={classes.container}>
        <div className={classes.title}>WASM Tic-Tac-Toe</div>
      </Container>
      <Container maxWidth="md" className={classes.container}>
        <BotSelector
          title="Bot One"
          value={botOne}
          onChange={selectBotOne}
          options={options}
        />
        <BotSelector
          title="Bot Two"
          value={botTwo}
          onChange={selectBotTwo}
          options={options}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '2%' }}
          onClick={() => history.push(`/play?x=${botOne}&o=${botTwo}`)}
        >
          Play The game
        </Button>
      </Container>
      <BotUploader />
    </Grid>
  );
}

export default StartView;
