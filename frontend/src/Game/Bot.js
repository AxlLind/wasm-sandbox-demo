import { decode } from 'base64-arraybuffer';
import request from 'superagent';

// Sending complicated objects to WASM is annoying.
// This is a demo so lets just cram the board state
// into a single i32 and pass that to the module.
const boardToWasmArray = board => {
  // convert to 'binary' values
  const wasmArray = board
    .map(box => {
      if (box === null) return '00';
      if (box === 'X') return '01';
      if (box === 'O') return '10';
      return '11';
    })
    .reverse();
  // parse string as binary number
  return parseInt(wasmArray.join(''), 2);
};

// Loads the wasm module from a base64 string
const loadWasmModule = async base64 => {
  const bytes = decode(base64);
  const { instance } = await WebAssembly.instantiate(bytes);
  if (!instance.exports.makeMove) {
    console.log('No makeMove function');
    return null;
  }
  return instance.exports;
};

class Bot {
  constructor(name) {
    this.name = name;
    this.wasm = null;
  }

  makeMove = board => {
    const boardAsInt = boardToWasmArray(board);
    const move = this.wasm.makeMove(boardAsInt);
    console.log(`Bot '${this.name}' made move ${move}`);
    return move;
  };

  static async fetch(name) {
    const bot = new Bot(name);
    const { body } = await request
      .post(`https://wasm-bots.herokuapp.com/bots/get-by-name`)
      .query({ name });
    bot.wasm = await loadWasmModule(body.base64_encoded_bot);
    return bot;
  }
}

export default Bot;
