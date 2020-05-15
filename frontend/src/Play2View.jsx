import React, { Component } from 'react';
import Board from './Game/Board';

class Play2View extends Component {

    constructor(props) {
        super(props);

        // Get the bots from the url params
        const query_params = new URLSearchParams(props.location.search)

        this.state = {
            bot1: query_params.get("bot1"),
            bot2: query_params.get("bot2")
        };

        console.log("Fighting bots:", this.state.bot1, this.state.bot2)
    }


    render() {
        return (
            <div>
                <div>
                    What a thing
                </div>
                <Board></Board>
            </div>
        )
    }
}

export default Play2View;
