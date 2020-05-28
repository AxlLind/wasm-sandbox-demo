import React, { useState, useRef } from 'react';
import request from 'superagent';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
} from '@material-ui/core';
import { backendUrl } from './config';

const DialogInstructions = () => (
  <DialogContentText component="div">
    To upload your own bot select your compiled WebAssembly file and give it a
    name! The requirements put on the file are the following:
    <ul>
      <li>
        It must be a valid <b>wasm</b> file.
      </li>
      <li>
        It cannot import <b>any</b> external functions.
      </li>
      <li>
        It must export a <b>single</b> function <i>'makeMove'</i>.
      </li>
    </ul>
    This function takes in the whole board as a single number. Every two bits
    from bit <b>0-17</b> represent one box of the board, with the upper left box
    in bits <b>0-1</b> and so on. A <b>0</b> value represents an empty board
    state, <b>1</b> your pieces, and <b>2</b> your opponent. The return value of
    the function should be a number between 0-8, indicating the index of the
    square to place your piece. May the best bot win!
  </DialogContentText>
);

const uploadBot = async (file, name, onSuccess) => {
  if (!file || !name) return;

  // hacky way to read a file as a base64 string
  const base64File = await new Promise(resolve => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload = () => resolve(r.result.split('base64,').pop());
  });
  try {
    await request
      .post(`${backendUrl}/bots`)
      .send({ name, base64_encoded_bot: base64File });
    onSuccess();
  } catch (e) {
    console.error(e);
  }
};

const UploadModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
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
    <>
      <Fab
        variant="extended"
        style={{ marginTop: '8%' }}
        onClick={() => setOpen(true)}
      >
        <NavigationIcon /> Upload Your Bot
      </Fab>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Upload Your Bot</DialogTitle>
        <DialogContent>
          <DialogInstructions />
          <Grid container alignItems="flex-end" spacing={2}>
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
                color="primary"
                variant="contained"
                onClick={() => input.current.click()}
              >
                {file ? file.name : 'Select File'}
              </Button>
              <input hidden type="file" ref={input} onChange={onFileSelect} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadModal;
