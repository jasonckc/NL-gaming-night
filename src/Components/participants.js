import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './participants.css';

class Participants extends Component {
    handleKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            this.props.add(evt);
        }
    }

    render() {
        let participants = this.props.participants.map(
            (name, i) => 
                <li key={i}>
                    <button
                        className="participants-btn-remove"
                        onClick={this.props.remove.bind(this, i)}
                    >
                        <FontAwesomeIcon icon="user-minus" />
                    </button>
                    <span>{name}</span>
                </li>  
        );

        return (
            <div className="participants-wrapper">
                <h1 className="participants-title">Participants</h1>
                <input 
                    type="text"
                    onChange={this.props.update}
                    onKeyPress={this.handleKeyPress}
                    value={this.props.participant}
                    placeholder="Name..."
                >
                </input>
                <button
                    className="participants-btn-add"
                    onClick={this.props.add}
                >
                    Add
                </button>
                <ul className="participants-list">{participants}</ul>
                <button
                    className="participants-btn-next"
                    onClick={this.props.next}
                >
                    Next
                </button>
            </div>
        );
    }
}

export default Participants;