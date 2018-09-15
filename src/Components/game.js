import './game.css'

import React, { Component } from 'react';

class Game extends Component {
    render() {
        let teams = [];
        for (let i = 0; i < this.props.nbteams; i++) {
            teams.push(
                <div className="game-team" key={i}>
                    <div className="game-team-name">
                        Team {i + 1}
                    </div>
                    <div className="game-team-score">
                        <input
                            type="number"
                            onChange={evt => this.props.update(i, evt)}
                            placeholder="Points..."
                        ></input>
                        <label>Points</label>
                    </div>
                </div>
            );
        }
        return (
            <div className="background game-bg">
                <div className="game-wrapper">
                    <h1 className="game-title">Game</h1>
                    <div className="game-teams">
                        {teams}
                    </div>
                    <button
                        className="game-btn-next"
                        onClick={this.props.next}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;