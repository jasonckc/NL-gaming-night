import './ranking.css';

import React, { Component } from 'react';

class ranking extends Component {
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
                        <h3>Team {maxIndex + 1}</h3>
                        {points[maxIndex].toString()} points
                    </div>
                </div>
            );
            points[maxIndex] = Number.MIN_SAFE_INTEGER;
        }
        return (
            <div className="ranking-bg background">
                <div className="ranking-wrapper">
                    <h1 className="ranking-title">Ranking</h1>
                    <div className="ranking-teams">
                        {teams}
                        <br/>
                        <button
                            className="ranking-btn-next"
                            onClick={this.props.next}>
                            Next
                        </button>
                        <small
                            className="ranking-btn-restart"
                            onClick={this.props.restart}
                        >
                            Restart
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ranking;