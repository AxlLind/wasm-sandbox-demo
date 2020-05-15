import React from 'react';

export const Box = props => {
    // The boxes the tic-tac-toe board consists of
    return (
        <button className="board__box" onClick={props.onClick}>
            {props.value}
        </button>
    )
}