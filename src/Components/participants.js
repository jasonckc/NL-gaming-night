import React, { Component } from 'react';

class Participants extends Component {
    render() {
        let participants = this.props.participants.map(
            (name, i) => 
                <li key={i}>
                    {name}
                    <button onClick={this.props.remove.bind(this, i)}>Delete</button>
                </li>
                
            
        );

        return (
            <div>
                <h1>Participants</h1>
                <input type="text" onChange={this.props.update} value={this.props.participant}></input>
                <button onClick={this.props.add}>Add</button>
                <ul>{participants}</ul>
                <button onClick={this.props.next}>Next</button>
            </div>
        );
    }
}

export default Participants;