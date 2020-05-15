import React from 'react';
import './Styling.css'

export const Box = props => {
    // The boxes the tic-tac-toe board consists of
    return (
        <button className="board__box" onClick={props.onClick}>
            {props.value}
        </button>
    )
}