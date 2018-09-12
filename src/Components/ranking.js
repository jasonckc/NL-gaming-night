import React, { Component } from 'react';

class ranking extends Component {
    render() {
        let teams = [];
        let points = this.props.points.slice();
        for (let i = 0; i < points.length; i++) {
            let maxIndex = points.reduce((max, x, i, arr) => x > arr[max] ? i : max, 0);
            teams.push(
                <tr key={i}>
                    <td><h4>Team {maxIndex + 1}</h4></td>
                    <td>{points[maxIndex].toString()} points</td>
                </tr>
            );
            points[maxIndex] = Number.MIN_SAFE_INTEGER;
        }
        return (
            <div>
                <h1>Ranking</h1>
                <table><tbody>{teams}</tbody></table>
                <button onClick={this.props.next}>Next</button>
            </div>
        );
    }
}

export default ranking;