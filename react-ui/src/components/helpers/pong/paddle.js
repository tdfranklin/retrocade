import React, { Component } from 'react';
import { BuildRect, RectBorder } from '../helpers';

class Paddle extends Component {
    
    componentDidUpdate(prevProps, prevState) {
        BuildRect(this.props.color, 'canvas', this.props.xPos, this.props.yPos, this.props.width, this.props.height);
        RectBorder(this.props.borderColor, 'canvas', this.props.xPos, this.props.yPos, this.props.width, this.props.height, 3);
    }

    render() {
        return (
        <div className="Paddle">
        </div>
        );
    }
}

export default Paddle;