import React, { Component } from 'react';
import Bot from './Bot';
import './Styling.css';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game extends Component {
  constructor(props) {
    super(props);

    // Initialize board state
    this.state = {
      boxes: Array(9).fill(null),
      xPlayer: props.xPlayer || 'human',
      oPlayer: props.oPlayer || 'human',
      xIsNext: true,
      isRunning: true,
      winner: null,
      xBot: null,
      oBot: null,
    };

    console.log('Initialized Game');
    console.log('Player X:', this.state.xPlayer);
    console.log('Player O:', this.state.oPlayer);
  }

  componentDidMount = async () => {
    // instantiate bots, if there are any
    const { xPlayer, oPlayer } = this.state;
    const xBot = xPlayer === 'human' ? null : await Bot.fetch(xPlayer);
    const oBot = oPlayer === 'human' ? null : await Bot.fetch(oPlayer);
    this.setState({ xBot, oBot });
  };

  /**
   * @returns the winning player or null
   */
  checkWinner = boxes => {
    const threeInARow = winningCombinations.find(
      ([a, b, c]) =>
        boxes[a] != null && boxes[a] === boxes[b] && boxes[b] === boxes[c],
    );
    return threeInARow ? boxes[threeInARow[0]] : null;
  };

  /**
   * Plays the next players move
   * @param {int} index
   * @return true if move was successfully
   */
  playMove = index => {
    const { boxes, xIsNext } = this.state;

    if (boxes[index] != null) {
      console.log('A move has already been played here');
      return false;
    }

    boxes[index] = xIsNext ? 'X' : 'O';
    this.setState({ boxes, xIsNext: !xIsNext });
    return true;
  };

  /**
   * Plays bots
   */
  playBots = () => {
    // Check if there are any bots playing
    const { xIsNext, xBot, oBot, boxes } = this.state;
    const bot = xIsNext ? xBot : oBot;
    if (!bot) return;

    // get move from xBot
    const move = bot.makeMove(boxes);
    const res = this.playMove(move);
    if (!res) console.error('Bot failed');
  };

  /**
   * Handles all game logic. Should be run at the end of every turn.
   */
  tick = () => {
    const { boxes } = this.state;

    // Stop game if all boxes are checked
    const allBoxesChecked = boxes.every(box => box !== null);
    if (allBoxesChecked) {
      this.setState({ isRunning: false });
    } else {
      this.playBots();
    }

    // Check for winner
    const winner = this.checkWinner(boxes);

    if (winner) {
      this.setState({ winner, isRunning: false });
    }
  };

  resetGame = () => {
    this.setState({
      boxes: Array(9).fill(null),
      xIsNext: true,
      isRunning: true,
      winner: null,
    });
  };

  handleBoxClick = index => {
    const { xIsNext, xPlayer, oPlayer } = this.state;
    const player = xIsNext ? xPlayer : oPlayer;
    if (player === 'human') {
      this.playMove(index);
      this.tick();
    }
  };

  createBoxComponent = index => (
    <button className="board__box" onClick={() => this.handleBoxClick(index)}>
      {this.state.boxes[index]}
    </button>
  );

  render = () => {
    const { isRunning, winner, xPlayer, oPlayer } = this.state;
    return (
      <div className="game-wrapper">
        <div className="board">
          <div className="board-row">
            {this.createBoxComponent(0)}
            {this.createBoxComponent(1)}
            {this.createBoxComponent(2)}
          </div>
          <div className="board-row">
            {this.createBoxComponent(3)}
            {this.createBoxComponent(4)}
            {this.createBoxComponent(5)}
          </div>
          <div className="board-row">
            {this.createBoxComponent(6)}
            {this.createBoxComponent(7)}
            {this.createBoxComponent(8)}
          </div>
        </div>
        <div className="stats">
          <h2>X Player: {xPlayer}</h2>
          <h2>O Player: {oPlayer}</h2>
          {isRunning ? (
            <div className="playBot__button">
              <button onClick={this.tick}>Play bot</button>
            </div>
          ) : (
            <div>
              <h2>Winner: {winner}</h2>
              <button onClick={this.resetGame}>Play again</button>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default Game;
