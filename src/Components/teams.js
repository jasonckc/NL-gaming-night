import './teams.css'

import Modal from './modal';
import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamToEdit: -1
        };
    }

    handleKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            this.props.set(this.state.teamToEdit);
            this.setTeamToEdit(-1);
        }
    }

    setTeamToEdit = (teamid) => {
        this.setState({teamToEdit: teamid});
    }

    editTeamName = () => {
        let teamid = this.state.teamToEdit;
        return (
            <div>
                <h4>Change team name</h4>
                <input
                    type="text"
                    onChange={evt => this.props.update(teamid, evt)}
                    value={this.props.teamname[teamid]}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Name..."
                ></input>
            </div>
        );
    }

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
                        <h3 onClick={() => this.setTeamToEdit(i)}>
                            {this.props.teamnames[i]}
                        </h3>
                        <ul>{membersLst}</ul>
                    </div>
                );
            }
        );

        return (
            <div className="teams-bg background">
                <Modal
                    show={this.state.teamToEdit >= 0}
                    onSetContent={() => this.editTeamName()}
                    onClose={() => this.setTeamToEdit(-1)}
                />
                <div className="teams-wrapper">
                    <h1 className="teams-title">Teams</h1>
                    <div className="teams-teams">{teams}</div>
                    <div className="teams-bottom">
                        <div className="teams-bottom-left">
                            <button
                                className="teams-btn-refresh"
                                onClick={this.props.refresh}
                            >
                                <FontAwesomeIcon icon="redo-alt" />
                            </button>
                        </div>
                        <div className="teams-bottom-right">
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
                                Start!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Teams;