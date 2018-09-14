import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
                    <div className="teams-team" key={i}>
                        <h3>Team {i + 1}</h3>
                        <ul>{membersLst}</ul>
                    </div>
                );
            }
        );

        return (
            <div className="teams-bg background">
                <div className="teams-wrapper">
                    <h1 className="teams-title">Teams</h1>
                    <button
                        className="teams-btn-refresh"
                        onClick={this.props.refresh}
                    >
                        <FontAwesomeIcon icon="redo-alt" />
                    </button>
                    <div className="teams-teams">{teams}</div>
                    <button
                        className="teams-btn-back"
                        onClick={this.props.back}
                    >
                        Back
                    </button>
                    <button
                        className="teams-btn-next"
                        onClick={this.props.next}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default Teams;