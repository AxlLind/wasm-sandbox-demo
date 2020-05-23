import React, { PureComponent } from 'react';
import { Button, Grid, withStyles } from '@material-ui/core';
import Bot from './Bot';

const useStyles = () => ({
  gridButton: {
    width: '100px',
    height: '100px',
    margin: '4px',
    fontSize: '30px',
  },
  mainContainer: {
    marginTop: '10%',
    textAlign: 'center',
  },
});

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

const checkWinner = boxes => {
  const threeInARow = winningCombinations
    .map(arr => arr.map(i => boxes[i]))
    .find(([a, b, c]) => a !== null && a === b && b === c);
  return threeInARow && threeInARow[0];
};

class Game extends PureComponent {
  constructor(props) {
    super(props);

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
  }

  componentDidMount = async () => {
    // instantiate bots, if there are any
    const { xPlayer, oPlayer } = this.state;
    const xBot = xPlayer === 'human' ? null : await Bot.fetch(xPlayer, true);
    const oBot = oPlayer === 'human' ? null : await Bot.fetch(oPlayer, false);
    this.setState({ xBot, oBot });
  };

  playMove = move => {
    const { boxes, xIsNext } = this.state;
    if (boxes[move] !== null) return false;

    boxes[move] = xIsNext ? 'X' : 'O';

    // Stop game if board is full or has a winner
    const winner = checkWinner(boxes);
    const isRunning = !winner && boxes.some(box => box === null);
    this.setState({ boxes, winner, isRunning, xIsNext: !xIsNext });
    return true;
  };

  onPlayBot = () => {
    // Check if there are any bots playing
    const { xIsNext, xBot, oBot, boxes } = this.state;
    const bot = xIsNext ? xBot : oBot;
    if (!bot) return;

    const move = bot.makeMove(boxes);
    const res = this.playMove(move);
    if (!res) console.error('Bot failed');
  };

  onBoxClick = move => {
    const { xIsNext, xPlayer, oPlayer, isRunning } = this.state;
    const player = xIsNext ? xPlayer : oPlayer;
    if (isRunning && player === 'human') {
      this.playMove(move);
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

  gameRow = ids => (
    <Grid container justify="center">
      {ids.map(i => (
        <Grid item key={i}>
          <Button
            onClick={() => this.onBoxClick(i)}
            className={this.props.classes.gridButton}
            variant="contained"
            color="primary"
          >
            {this.state.boxes[i] || ' '}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  render = () => {
    const { classes } = this.props;
    const { isRunning, winner, xPlayer, oPlayer } = this.state;
    const title = winner ? `Winner is ${winner}!` : `${xPlayer} vs ${oPlayer}`;
    return (
      <Grid container className={classes.mainContainer}>
        <Grid container justify="center">
          <h2>{title}</h2>
        </Grid>
        <Grid container>
          {this.gameRow([0, 1, 2])}
          {this.gameRow([3, 4, 5])}
          {this.gameRow([6, 7, 8])}
        </Grid>
        <Grid container justify="center" style={{ marginTop: '2%' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={isRunning ? this.onPlayBot : this.resetGame}
          >
            {isRunning ? 'Play bot' : 'Play Again?'}
          </Button>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(useStyles)(Game);
