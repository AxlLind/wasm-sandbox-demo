import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

function StartView() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label1">First Bot</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          onChange={() => {}}
        >
          <MenuItem disabled>First Bot</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label2">Second Bot</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          onChange={() => {}}
        >
          <MenuItem disabled>Second Bot</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" style={{ marginTop: '2%' }}>
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
