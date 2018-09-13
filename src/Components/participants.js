import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './participants.css';

class Participants extends Component {
    render() {
        let participants = this.props.participants.map(
            (name, i) => 
                <li key={i}>
                    <button
                        class="participants-btn-remove"
                        onClick={this.props.remove.bind(this, i)}
                    >
                        <FontAwesomeIcon icon="user-minus" />
                    </button>
                    <span>{name}</span>
                </li>  
        );

        return (
            <div class="participants-wrapper">
                <h1 class="participants-title">Participants</h1>
                <input 
                    type="text"
                    onChange={this.props.update}
                    value={this.props.participant}
                    placeholder="Name..."
                >
                </input>
                <button
                    class="participants-btn-add"
                    onClick={this.props.add}
                >
                    Add
                </button>
                <ul class="participants-list">{participants}</ul>
                <button
                    class="participants-btn-next"
                    onClick={this.props.next}
                >
                    Next
                </button>
            </div>
        );
    }
}

export default Participants;