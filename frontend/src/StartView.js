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

function BotSelector({ title, id, options }) {
  const [selected, setSelected] = useState('');
  const classes = useStyles();
  const labelId = `${id}-label`;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{title}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
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
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <BotSelector
        title="First Bot"
        id="first-bot-selector"
        options={[1, 2, 3]}
      />
      <BotSelector
        title="Second Bot"
        id="second-bot-selector"
        options={[1, 2, 3]}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: '2%' }}
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
