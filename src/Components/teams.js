import React, { Component } from 'react';

import './teams.css'

class Teams extends Component {
    render() {
        let teams = this.props.teams.map(
            (members, i) => {
                if (members.length === 0)
                    return (<div></div>) 

                let membersLst = members.map(
                    (name, j) => <li key={j}>{name}</li>
                );
                return (
                    <div class="teams-team" key={i}>
                        <h3>Team {i + 1}</h3>
                        <ul>{membersLst}</ul>
                    </div>
                );
            }
        );

        return (
            <div>
                <h1>Teams</h1>
                <button onClick={this.props.refresh}>Refresh</button>
                {teams}
                <button onClick={this.props.back}>Back</button>
                <button onClick={this.props.next}>Next</button>
            </div>
        );
    }
}

export default Teams;