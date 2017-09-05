import React, { Component } from 'react';
import { BuildCircle } from './helpers';

class Ball extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        BuildCircle('canvas', 'white', this.props.xPos, this.props.yPos, this.props.radius);
    }

    componentWillUpdate() {
    }

    componentDidUpdate(prevProps, prevState) {
        BuildCircle('canvas', 'white', this.props.xPos, this.props.yPos, this.props.radius);
    }

    render() {
        return (
        <div className="Ball">
        </div>
        );
    }
}

export default Ball;