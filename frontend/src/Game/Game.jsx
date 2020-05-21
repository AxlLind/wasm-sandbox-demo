import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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

  playMove = index => {
    const { boxes, xIsNext, isRunning } = this.state;

    if (!isRunning) return false;
    if (boxes[index] !== null) return false;

    boxes[index] = xIsNext ? 'X' : 'O';
    this.setState({ boxes, xIsNext: !xIsNext });
    return true;
  };

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
    const winner = checkWinner(boxes);

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

  gameRow = ids => (
    <Grid container justify="center">
      {ids.map(i => (
        <Grid item key={i}>
          <Button
            onClick={() => this.handleBoxClick(i)}
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
            onClick={isRunning ? this.tick : this.resetGame}
          >
            {isRunning ? 'Play bot' : 'Play Again?'}
          </Button>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(useStyles)(Game);
