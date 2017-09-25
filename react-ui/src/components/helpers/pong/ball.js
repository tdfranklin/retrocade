import React, { Component } from 'react';
import { BuildCircle } from '../helpers';

class Ball extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidUpdate(prevProps, prevState) {
        BuildCircle('canvas', this.props.color, this.props.xPos, this.props.yPos, this.props.radius)
    }

    render() {
        return (
        <div className="Ball">
        </div>
        );
    }
}

export default Ball;