import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Participants(props) {
    let participants = props.participants.map(
        (name, i) => <li key={i}>{name}</li>
    );
    return (
        <div>
            <h1>Participants</h1>
            <input type="text" onChange={props.update}></input>
            <button onClick={props.add}>Add</button>
            <ul>{participants}</ul>
            <button onClick={props.next}>Next</button>
        </div>
    );
}

function Teams(props) {
    let teams = props.teams.map(
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
            <button onClick={props.next}>Next</button>
        </div>
    );
}

function Game(props) {
    let teams = [];
    for (let i = 0; i < props.nbteams; i++) {
        teams.push(
            <tr key={i}>
                <td>
                    <h4>Team {i + 1}</h4>
                </td>
                <td>
                    <input
                        type="number"
                        onChange={evt => props.update(i, evt)}>
                    </input>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <h1>Game</h1>
            <table><tbody>{teams}</tbody></table>
            <button onClick={props.next}>Next</button>
        </div>
    );
}

function Ranking(props) {
    let teams = [];
    let points = props.points.slice();
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
            <button onClick={props.next}>Next</button>
        </div>

    );
}

class App extends React.Component {
    constructor(props) {
        super(props);

        let nbOfTeams = parseInt(props.nbteams, 10);
        this.state = {
            participants: [],
            teams: new Array(nbOfTeams).fill().map(u => []),
            points: new Array(nbOfTeams).fill(0),

            screen: 0,
            participant: '',
            pointsToAdd: new Array(nbOfTeams).fill(0),
        };
    }

    updateParticipant(name) {
        this.setState({participant: name})
    }

    addParticipant() {
        if (this.state.participant !== "") {
            let participants = this.state.participants.slice();
            participants.push(this.state.participant);
            this.setState({participants: participants, participant: ''});
        }
    }

    removeParticipant(index) {
        if (index != null) {
            let participants = this.state.participants.slice();
            participants.splice(index, 1);
            this.setState({participants: participants});
        }
    }

    makeTeams() {
        let participants = this.state.participants.slice();
        let teams = this.state.teams.slice();        

        let nbOfTeams = parseInt(this.props.nbteams, 10);
        let team = 0;
        while (participants.length > 0) {
            let index = Math.floor(Math.random() * participants.length);
            teams[team].push(participants[index]);
            participants.splice(index, 1);
            team = (team + 1) % nbOfTeams;
        }

        this.setState({teams: teams});
    }

    updateTeamPoints(team, points) {
        let pointsToAdd = this.state.pointsToAdd.slice();
        pointsToAdd[team] = parseInt(points, 10);
        this.setState({pointsToAdd: pointsToAdd});
    }

    commitTeamPoints() {
        let nbOfTeams = parseInt(this.props.nbteams, 10);
        let points = this.state.points.map(
            (points, i) => points + this.state.pointsToAdd[i]
        );
        this.setState({
            points: points,
            pointsToAdd: new Array(nbOfTeams).fill(0)
        });
    }

    setScreen(id) {
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
                        update={evt => this.updateParticipant(evt.target.value)}
                        add={() => this.addParticipant()}
                        remove={i => this.removeParticipant(i)}
                        next={() => this.setScreen(1)}
                    />
                );
            case 1:
                return (
                    <Teams
                        teams={this.state.teams}
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