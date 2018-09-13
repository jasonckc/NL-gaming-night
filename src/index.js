import './index.css';
import './icons.js'

import Game from './Components/game';
import Participants from './Components/participants';
import Ranking from './Components/ranking';
import Teams from './Components/teams';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        let nbOfTeams = parseInt(props.nbteams, 10);
        this.state = {
            participants: [],
            teams: [],
            points: new Array(nbOfTeams).fill(0),

            screen: 0,
            participant: '',
            pointsToAdd: new Array(nbOfTeams).fill(0),
        };
    }

    updateParticipant = (evt) => {
        const nextState = {
            ...this.state, 
            participant: evt.target.value
        };
        this.setState(nextState);
    }

    addParticipant = () => {
        if (this.state.participant !== "") {
            let participants = this.state.participants.slice();
            participants.push(this.state.participant);
            this.setState({participants: participants, participant: ''});
        }
    }

    removeParticipant = (index) => {
        if (index != null) {
            let participants = this.state.participants.slice();
            participants.splice(index, 1);
            this.setState({participants: participants});
        }
    }

    makeTeams = () => {
        let participants = this.state.participants.slice();
        let nbOfTeams = parseInt(this.props.nbteams, 10);
        let teams = new Array(nbOfTeams).fill().map(u => []);        

        let team = 0;
        while (participants.length > 0) {
            let index = Math.floor(Math.random() * participants.length);
            teams[team].push(participants[index]);
            participants.splice(index, 1);
            team = (team + 1) % nbOfTeams;
        }

        this.setState({teams: teams});
    }

    updateTeamPoints = (team, points) => {
        let pointsToAdd = this.state.pointsToAdd.slice();
        pointsToAdd[team] = parseInt(points, 10);
        this.setState({pointsToAdd: pointsToAdd});
    }

    commitTeamPoints = () => {
        let nbOfTeams = parseInt(this.props.nbteams, 10);
        let points = this.state.points.map(
            (points, i) => points + this.state.pointsToAdd[i]
        );
        this.setState({
            points: points,
            pointsToAdd: new Array(nbOfTeams).fill(0)
        });
    }

    setScreen = (id) => {
        switch (id) {
            case 1:
                this.makeTeams();
                this.setState({screen: 1});
                break;
            case 0:
            case 2:
                this.setState({screen: id});
                break;
            case 3:
                this.commitTeamPoints();
                this.setState({screen: 3});
                break;
            default:
                break;
        }
    }

    render() {
        switch (this.state.screen) {
            case 0:
                return (
                    <Participants
                        participants={this.state.participants}
                        participant={this.state.participant}
                        update={evt => this.updateParticipant(evt)}
                        add={() => this.addParticipant()}
                        remove={i => this.removeParticipant(i)}
                        next={() => this.setScreen(1)}
                    />
                );
            case 1:
                return (
                    <Teams
                        teams={this.state.teams}
                        prev={() => this.setScreen(0)}
                        next={() => this.setScreen(2)}
                    />
                );
            case 2:
                return (
                    <Game
                        nbteams={this.props.nbteams}
                        update={(team, evt) => this.updateTeamPoints(team, evt.target.value)}
                        next={() => this.setScreen(3)}
                    />
                );
            case 3:
                return (
                    <Ranking
                        points={this.state.points}
                        next={() => this.setScreen(2)}
                    />
                )
            default:
                return (<h1>404 Not found</h1>)
        }
    }
}

ReactDOM.render(
    <App nbteams="4"/>,
    document.getElementById('root')
);