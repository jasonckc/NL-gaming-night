import React, { Component } from 'react';

class Game extends Component {
    render() {
        let teams = [];
        for (let i = 0; i < this.props.nbteams; i++) {
            teams.push(
                <tr key={i}>
                    <td>
                        <h4>Team {i + 1}</h4>
                    </td>
                    <td>
                        <input
                            type="number"
                            onChange={evt => this.props.update(i, evt)}>
                        </input>
                    </td>
                </tr>
            );
        }
        return (
            <div>
                <h1>Game</h1>
                <table><tbody>{teams}</tbody></table>
                <button onClick={this.props.next}>Next</button>
            </div>
        );
    }
}

export default Game;