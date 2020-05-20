import React, { useState, useRef } from 'react';
import request from 'superagent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

const UPLOAD_URL = 'https://wasm-bots.herokuapp.com/bots';

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    marginTop: '4%',
    marginBottom: '4%',
  },
}));

const DialogInstructions = () => (
  <DialogContentText>
    To upload your own bot select your compiled WebAssembly file and give it a
    name! The requirements put on the file are the following:
    <br />
    <br />- It cannot import <b>any</b> external functions.
    <br />- It must export a <b>single</b> function <i>'makeMove'</i>.
    <br />- This function takes in the whole board as a single number. Every two
    bits from bit <b>0-17</b> represent one box of the board, with the upper
    left box in bits <b>0-1</b> and so on. A <b>0</b> value represents an empty
    box, <b>1</b> your pieces, and <b>2</b> your opponent.
    <br />
    <br />
    May the best bot win!
  </DialogContentText>
);

// hacky way to read a file as a base64 string
const readFileAsBase64 = file =>
  new Promise(resolve => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload = () => resolve(r.result.split('base64,').pop());
  });

const uploadBot = async (file, name, onSuccess) => {
  if (!file || !name) return;
  const base64File = await readFileAsBase64(file);
  const body = { name, base64_encoded_bot: base64File };
  try {
    await request.post(UPLOAD_URL).send(body);
    onSuccess();
  } catch (e) {
    console.error(e);
  }
};

const BotUploader = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const classes = useStyles();
  const input = useRef(null);

  const onClose = () => {
    setOpen(false);
    setFile(null);
    setName('');
  };
  const onSubmit = () => uploadBot(file, name, onClose);
  const onFileSelect = e => setFile(e.target.files[0]);
  const onTextChange = e => setName(e.target.value);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Fab
        variant="extended"
        style={{ marginTop: '4%' }}
        onClick={() => setOpen(true)}
      >
        <NavigationIcon /> Upload Your Bot
      </Fab>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Upload Your Bot</DialogTitle>
        <DialogContent>
          <DialogInstructions />
          <Grid container alignItems="flex-end" spacing={1}>
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                label="Bot name"
                value={name}
                onChange={onTextChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => input.current.click()}
              >
                {file ? file.name : 'Select File'}
              </Button>
              <input hidden type="file" ref={input} onChange={onFileSelect} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BotUploader;
