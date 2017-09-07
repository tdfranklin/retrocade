import React, { Component } from 'react';
import { BuildRect } from '../helpers';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        //this.drawBody(25, 25);
    }

    drawBody(xPos, yPos) {
        const size = this.props.size;
        const color = this.props.color;
        BuildRect(color, 'canvas', (xPos * size), (yPos * size), size, size);
    }

    render() {
        return (
        <div className="Body">
        </div>
        );
    }
}

export default Body;