import React, { Component } from 'react';
import { Box } from './Box';
import './Styling.css';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


class Game extends Component {
    constructor(props) {
        super(props)


        // Initialize board state
        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xPlayer: props.xPlayer || "human",
            oPlayer: props.oPlayer || "human",
            xIsNext: true,
            isRunning: true,
            winner: null
        }

        console.log("Initialized Game")
        console.log("Player X:", this.state.xPlayer)
        console.log("Player O:", this.state.oPlayer)
    }

    allTrue = arr => arr.every(e => e)

    allBoxesChecked = boxes => {
        const checked_array = boxes.map(x => x != null)
        return this.allTrue(checked_array)
    }

    /**
     * @returns the winning player or null
     */
    checkWinner(boxes) {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            const player = boxes[a]
            // check if a player has that combination
            if (player === boxes[b] && player === boxes[c]) {
                return player
            }
        }
        return null
    }

    /**
     * Plays the next players move
     * @param {int} index 
     * @return true if move was successfully
     */
    playMove(index) {
        const boxes = this.state.boxes
        let history = this.state.history

        if (boxes[index] != null) {
            console.log("A move has already been played here")
            return false
        }

        boxes[index] = this.state.xIsNext ? "X" : "O"

        this.setState({
            boxes,
            xIsNext: !this.state.xIsNext
        })

        return true
    }

    /**
     * Plays bots
     */
    playBots() {
        // Check if there are any bots playing
        if (this.state.xIsNext) {
            if (this.state.xPlayer !== "human") {
                // get move from xBot
                let move = 0
                let res = false
                do {
                    move = Math.round(Math.random() * 9)
                    console.log("Playing bot", move)
                    res = this.playMove(move)
                } while (!res);
            }

        } else {
            if (this.state.oPlayer !== "human") {
                // get move from oBot
                let move = 0
                let res = false
                do {
                    move = Math.round(Math.random() * 9)
                    console.log("Playing bot", move)
                    res = this.playMove(move)
                } while (!res);
            }
        }
    }

    /**
     * Handles all game logic. Should be run at the end of every turn.
     */
    tick() {
        const { boxes } = this.state

        // Stop game if all boxes are checked
        if (this.allBoxesChecked(boxes)) {
            this.setState({
                isRunning: false
            })
        } else {
            this.playBots()
        }

        // Check for winner
        const winner = this.checkWinner(boxes)

        if(winner) {
            this.setState({
                winner,
                isRunning: false
            })    
        }
        
    }

    resetGame = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true,
            isRunning: true,
            winner: null
        })
    }

    handleBoxClick = index => {
        // move was made by a human
        if (this.state.xIsNext) {
            if (this.state.xPlayer === "human") {
                this.playMove(index)
                this.tick()
            }
        } else {
            if (this.state.oPlayer === "human") {
                this.playMove(index)
                this.tick()
            }
        }
    }

    createBoxComponent(index) {
        return <Box value={this.state.boxes[index]} onClick={() => this.handleBoxClick(index)} />
    }

    playBotButton = () => {
        if (this.state.xPlayer !== "human" || this.state.oPlayer !== "human") {
            return (
                <div className="playBot__button">
                    <button onClick={() => this.tick()}>
                        Play bot
                    </button>
                </div>
            )
        }
    }

    render() {
        const { isRunning, winner } = this.state

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
                    <h2>X Player: {this.state.xPlayer}</h2>
                    <h2>O Player: {this.state.oPlayer}</h2>
                        {!isRunning ?
                        <div>
                            <h2>Winner: {winner}</h2>
                            <button onClick={() => this.resetGame()}>Play again</button>
                        </div>
                        : 
                        this.playBotButton()
                        }
                </div>
            </div>
        )
    }
}

export default Game;