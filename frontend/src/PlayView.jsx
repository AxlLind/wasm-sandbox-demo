import React, { Component } from 'react';
import Game from './Game/Game';

class PlayView extends Component {

    constructor(props) {
        super(props);

        // Get the bots from the url params
        const query_params = new URLSearchParams(props.location.search)

        this.state = {
            xPlayer: query_params.get("xPlayer"),
            oPlayer: query_params.get("oPlayer")
        };
    }


    render() {
        return (
            <div>
                <div>
                    What a thing
                </div>
                <Game xPlayer={this.state.xPlayer} oPlayer={this.state.oPlayer}></Game>
            </div>
        )
    }
}

export default PlayView;
