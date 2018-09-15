import './game.css'

import Modal from './modal';
import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTeamModal: -1
        }
    }

    setCurTeamModal = (teamId) => {
        this.setState({curTeamModal: teamId});
    }

    showCurTeam = () => {
        let participants = this.props.teams[this.state.curTeamModal].map(
            (val, i) => <li key={i}>{val}</li>
        );

        return (
            <div>
                <h3>Team {this.state.curTeamModal + 1}</h3>
                <ul>{participants}</ul>
            </div>
        );
    }

    render() {
        let teams = [];
        for (let i = 0; i < this.props.teams.length; i++) {
            teams.push(
                <div className="game-team" key={i}>
                    <div className="game-team-name">
                        Team {i + 1} <FontAwesomeIcon
                            icon="info-circle"
                            onClick={() => this.setCurTeamModal(i)}
                        />
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
                <Modal
                    show={this.state.curTeamModal >= 0}
                    onSetContent={() => this.showCurTeam()}
                    onClose={() => this.setCurTeamModal(-1)}
                />
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