import { decode } from 'base64-arraybuffer';
import backend from './backend';

class Bot {
  constructor(isX) {
    const [us, them] = isX ? ['X', 'O'] : ['O', 'X'];
    this.us = us;
    this.them = them;
    this.wasm = null;
  }

  makeMove = board => {
    // Sending complicated objects to WASM is annoying.
    // This is a demo so lets just cram the board state
    // into a single i32 and pass that to the module.
    const boardAsInt = board
      .map((box, i) => {
        let val = 3;
        if (box === null) val = 0;
        if (box === this.us) val = 1;
        if (box === this.them) val = 2;
        return val << (i * 2);
      })
      .reduce((acc, val) => acc | val, 0);
    return this.wasm.makeMove(boardAsInt);
  };

  static async fetch(name, isX) {
    const res = await backend.post('/bots/get-by-name').query({ name });
    const base64 = res.body.base64_encoded_bot;
    const bytes = decode(base64);
    const { instance } = await WebAssembly.instantiate(bytes);

    const bot = new Bot(isX);
    bot.wasm = instance.exports;
    return bot;
  }
}

export default Bot;
