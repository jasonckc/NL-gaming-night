import './ranking.css';

import Modal from './modal';
import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ranking extends Component {
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
        let points = this.props.points.slice();
        for (let i = 0; i < points.length; i++) {
            let maxIndex = points.reduce((max, x, i, arr) => x > arr[max] ? i : max, 0);
            teams.push(
                <div className="ranking-team" key={i}>
                    <div className="ranking-team-rank">
                        {i + 1}
                    </div>
                    <div className="ranking-team-score">
                        <h3>Team {maxIndex + 1} <FontAwesomeIcon
                            icon="info-circle"
                            onClick={() => this.setCurTeamModal(i)}
                        /></h3>
                        {points[maxIndex].toString()} points
                    </div>
                </div>
            );
            points[maxIndex] = Number.MIN_SAFE_INTEGER;
        }
       
        
        return (
            <div className="ranking-bg background">
                <Modal
                    show={this.state.curTeamModal >= 0}
                    onSetContent={() => this.showCurTeam()}
                    onClose={() => this.setCurTeamModal(-1)}
                />
                <div className="ranking-wrapper">
                    <h1 className="ranking-title">Ranking</h1>
                    <div className="ranking-teams">
                        {teams}
                        <br/>
                        <button
                            className="ranking-btn-next"
                            onClick={this.props.next}>
                            Next game!
                        </button>
                        <small
                            className="ranking-btn-restart"
                            onClick={this.props.resetPoints}
                        >
                            <FontAwesomeIcon icon="redo-alt" /> Reset Points
                        </small>
                        <small
                            className="ranking-btn-restart"
                            onClick={this.props.restart}
                        >
                            <FontAwesomeIcon icon="redo-alt" /> Restart
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ranking;