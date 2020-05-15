import React, { useState, useRef } from 'react';
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
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function UploadButton({ onFileUpload }) {
  const [title, setTitle] = useState('Upload Bot');
  const input = useRef(null);
  const onChange = e => {
    const file = e.target.files[0];
    setTitle(`Uploaded!`);
    setTimeout(() => setTitle('Upload Bot'), 1000);
    onFileUpload(file);
  };
  return (
    <Fab
      variant="extended"
      style={{ marginTop: '10%' }}
      onClick={() => input.current.click()}
    >
      <input type="file" hidden ref={input} onChange={onChange} />
      <NavigationIcon />
      <div style={{ minWidth: '95px' }}>{title}</div>
    </Fab>
  );
}

function StartView() {
  const history = useHistory();
  const classes = useStyles();
  const [botOne, selectBotOne] = useState('');
  const [botTwo, selectBotTwo] = useState('');
  const options = ['bot-1', 'bot-2', 'bot-3'];
  return (
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
        onClick={() => history.push('/play', { botOne, botTwo })}
      >
        Play The game
      </Button>
      <br />
      <UploadButton onFileUpload={file => console.log(file)} />
    </Container>
  );
}

export default StartView;
