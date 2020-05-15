import React, { useState, useEffect, useRef } from 'react';
import request from 'superagent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
      style={{ marginTop: '5%' }}
      onClick={() => input.current.click()}
    >
      <NavigationIcon />
      <div style={{ minWidth: '95px' }}>{title}</div>
      <input hidden type="file" ref={input} onChange={onChange} />
    </Fab>
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
      .get('/bots')
      .then(res => setOptions(res.body))
      .catch(e => console.log(e));
  }, []);
  const onFileUpload = async file => {
    const dataUrl = await new Promise(resolve => {
      const r = new FileReader();
      r.readAsDataURL(file);
      r.onload = () => resolve(r.result);
    });

    // hacky way to get a base64 decoded file
    const base64File = dataUrl.split('base64,').pop();
    try {
      await request.post('/bots').send({
        name: 'test',
        base64_encoded_bot: base64File,
      });
    } catch (e) {
      console.log(e);
    }
  };
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
          onClick={() => history.push('/play', { botOne, botTwo })}
        >
          Play The game
        </Button>
      </Container>
      <Container maxWidth="md" className={classes.container}>
        <UploadButton onFileUpload={onFileUpload} />
      </Container>
    </Grid>
  );
}

export default StartView;
