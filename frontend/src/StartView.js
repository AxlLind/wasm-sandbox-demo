import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  container: {
    textAlign: 'center',
    marginTop: '20%',
  },
}));

function BotSelector({ title, options, value, onChange }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select value={value} onChange={e => onChange(e.target.value)}>
        {options.map((option, i) => (
          <MenuItem value={i} key={option}>
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
  return (
    <Container maxWidth="md" className={classes.container}>
      <BotSelector
        title="Bot One"
        value={botOne}
        onChange={selectBotOne}
        options={[1, 2, 3]}
      />
      <BotSelector
        title="Bot Two"
        value={botTwo}
        onChange={selectBotTwo}
        options={[1, 2, 3]}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: '2%' }}
        onClick={() => history.push('/play', { botOne, botTwo })}
      >
        Play The game
      </Button>
      <br />
      <Fab variant="extended" style={{ marginTop: '10%' }}>
        <NavigationIcon />
        Upload Bot
      </Fab>
    </Container>
  );
}

export default StartView;
