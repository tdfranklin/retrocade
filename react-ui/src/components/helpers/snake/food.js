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
    }

    componentDidUpdate() {
        const food = this.props.food;
        this.drawFood(food.x, food.y);
    }

    drawFood(xPos, yPos) {
        const size = this.props.size;
        const color = this.props.color;
        const borderColor = this.props.border;
        BuildRect(borderColor, 'canvas', (xPos * size), (yPos * size), size, size);
        BuildRect(color, 'canvas', (xPos * size + 1), (yPos * size + 1), size - 2, size - 2);
    }

    render() {
        return (
        <div className="Food">
        </div>
        );
    }
}

export default Food;