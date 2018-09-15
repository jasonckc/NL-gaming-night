import './modal.css'

import React, { Component } from 'react';

class Modal extends Component {
    render() {
        if (!this.props.show)
            return (<div></div>);

        return (
            <div>
                <div 
                    className="modal-overlay background"
                    onClick={()=>this.props.onClose()}
                >
                    <div
                        className="modal-wrapper"
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        {this.props.onSetContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;