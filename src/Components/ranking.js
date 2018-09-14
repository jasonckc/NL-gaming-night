import './ranking.css';

import React, { Component } from 'react';

class ranking extends Component {
    render() {
        let teams = [];
        let points = this.props.points.slice();
        for (let i = 0; i < points.length; i++) {
            let maxIndex = points.reduce((max, x, i, arr) => x > arr[max] ? i : max, 0);
            teams.push(
                <tr key={i}>
                    <td><h4>Team {maxIndex + 1} <span className="ranking-number-of-points"> {points[maxIndex].toString()} points </span></h4></td>
                </tr>
            );
            points[maxIndex] = Number.MIN_SAFE_INTEGER;
        }
        return (
            <div className="ranking-bg">
                <div className="ranking-wrapper">
                    <h1 className="ranking-title">Ranking</h1>
                    <div className="ranking-content">
                        <table className="ranking-table"><tbody>{teams}</tbody></table>
                        <div className="ranking-footer">
                            <button className="ranking-btn-next" onClick={this.props.next}>Next</button>
                        </div>
                        <small className="ranking-btn-restart" onClick={this.props.restart}>Restart</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ranking;