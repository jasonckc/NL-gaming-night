import './index.css';
import './icons.js'

import Game from './Components/game';
import Participants from './Components/participants';
import Ranking from './Components/ranking';
import Teams from './Components/teams';
import Serializer from './Util/serializer';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        // Load saved state variables from cookies
        let participants = Serializer.load('participants', [], val => val.split(';'));
        let teams = Serializer.load('teams', [], val => val.split(";").map(team => team.split(":")));
        let points = Serializer.load('points', new Array(nbOfTeams).fill(0), val => val.split(';'));
        let screen = Serializer.load('screen', 0, val => parseInt(val, 10));

        // Define state
        let nbOfTeams = parseInt(props.nbteams, 10);
        this.state = {
            participants: participants,
            teams: teams,
            points: points,
            screen: screen,

            participant: '',
            pointsToAdd: new Array(nbOfTeams).fill(0),
        };
    }

    reset = () => {
        Serializer.unset('participants');
        Serializer.unset('teams');
        Serializer.unset('points');
        Serializer.unset('screen');
        
        window.location.reload();
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
            this.setState({
                participants: participants,
                participant: ''
            });
            Serializer.save('participants', participants.join(';'));
        }
    }

    removeParticipant = (index) => {
        if (index != null) {
            let participants = this.state.participants.slice();
            participants.splice(index, 1);
            this.setState({participants: participants});
            this.saveState();
            Serializer.save('participants', participants.join(';'));
        }
    }

    makeTeams = (force = false) => {
        if (!force && this.state.teams.length > 0) {
            return;
        }

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
        Serializer.save('teams', teams.map(team => team.join(':')).join(';'));
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
        Serializer.save('points', points.join(';'));
    }

    setScreen = (id) => {
        let screen = this.state.screen;
        switch (id) {
            case 1:
                this.makeTeams();
                screen = 1;
                break;
            case 0:
            case 2:
                screen = id;
                break;
            case 3:
                this.commitTeamPoints();
                screen = 3;
                break;
            default:
                break;
        }

        this.setState({screen: screen});
        Serializer.save('screen', screen);
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
                        refresh={() => this.makeTeams(true)}
                        back={() => this.setScreen(0)}
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
                        restart={() => this.reset()}
                    />
                );
            default:
                return (<h1>404 Not found</h1>);
        }
    }
}

ReactDOM.render(
    <App nbteams="4"/>,
    document.getElementById('root')
);