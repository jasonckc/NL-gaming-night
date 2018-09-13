import React, { Component } from 'react';

class Teams extends Component {
    render() {
        let teams = this.props.teams.map(
            (members, i) => {
                let membersLst = members.map(
                    (name, j) => <li key={j}>{name}</li>
                );
                return (
                    <div key={i}>
                        <h3>Team {i + 1}</h3>
                        <ul>{membersLst}</ul>
                    </div>
                );
            }
        );

        return (
            <div>
                <h1>Teams</h1>
                {teams}
                <button onClick={this.props.next}>Next</button>
            </div>
        );
    }
}

export default Teams;