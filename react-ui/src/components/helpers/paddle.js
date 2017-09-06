import React, { Component } from 'react';
import { BuildRect } from './helpers';

class Paddle extends Component {
    
    componentDidUpdate(prevProps, prevState) {
        BuildRect('white', 'canvas', this.props.xPos, this.props.yPos, this.props.width, this.props.height);
    }

    render() {
        return (
        <div className="Paddle">
        </div>
        );
    }
}

export default Paddle;