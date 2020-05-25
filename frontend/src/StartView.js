import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import request from 'superagent';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core/';
import UploadModal from './UploadModal';

const useStyles = makeStyles(theme => ({
  selector: {
    marginTop: '4%',
    marginBottom: '4%',
  },
  title: {
    marginTop: '4%',
    marginBottom: '4%',
    fontSize: '80px',
    color: theme.palette.primary.main,
  },
}));

const BotSelector = ({ title, options, value, onChange }) => (
  <FormControl style={{ margin: 8, minWidth: 200 }}>
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

function StartView() {
  const history = useHistory();
  const classes = useStyles();
  const [botOne, selectBotOne] = useState('');
  const [botTwo, selectBotTwo] = useState('');
  const [options, setOptions] = useState(['human']);
  const onSubmit = () => history.push(`/play?x=${botOne}&o=${botTwo}`);

  useEffect(() => {
    request
      .get('https://wasm-bots.herokuapp.com/bots')
      .then(res => res.body.map(({ name }) => name))
      .then(options => setOptions(['human', ...options]))
      .catch(e => console.log(e));
  }, []);

  return (
    <Grid container justify="center" style={{ marginTop: '5%' }}>
      <Grid className={classes.title}>WASM Tic-Tac-Toe</Grid>
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        className={classes.selector}
      >
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
          onClick={onSubmit}
        >
          Play The game
        </Button>
      </Grid>
      <UploadModal />
    </Grid>
  );
}

export default StartView;
