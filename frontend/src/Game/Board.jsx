import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
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

class Board extends Component {
    constructor(props) {
        super(props)

        // Initialize board state
        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }

        console.log("Initialized Game")
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
            console.log(winningCombinations[i])
            const [a, b, c] = winningCombinations[i]  
            const player = boxes[a]
            // check if a player has that combination
            if (player === boxes[b] && player === boxes[c]) {
                return player
            }
        }
        return null
    }

    handleBoxClick(index) {
        const boxes = this.state.boxes
        let history = this.state.history

        if (boxes[index] != null) {
            console.log("A move has already been played here")
            return
        }

        boxes[index] = this.state.xIsNext ? "X" : "O"

        this.setState({
            boxes: boxes,
            xIsNext: !this.state.xIsNext
        })
    }

    createBoxComponent(index) {
        return <Box value={this.state.boxes[index]} onClick={() => this.handleBoxClick(index)} />
    }

    render() {
        const { boxes } = this.state
        
        // Check for winner
        const winner = this.checkWinner(boxes)

        // Stop game if all boxes are checked
        const isRunning = this.allBoxesChecked(boxes)

        return(
            <div className="board-wrapper">
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
            </div>
        )
    }
}

export default Board;