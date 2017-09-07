import React, { Component } from 'react';
import { BuildRect } from '../helpers';

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        //this.drawFood(10, 10);
    }

    drawFood(xPos, yPos) {
        const size = this.props.size;
        const color = this.props.color;
        BuildRect(color, 'canvas', (xPos * size), (yPos * size), size, size);
        //BuildRect('red', 'canvas', (xPos * size + 1), (yPos * size + 1), size - 2, size - 2);
    }

    render() {
        return (
        <div className="Food">
        </div>
        );
    }
}

export default Food;