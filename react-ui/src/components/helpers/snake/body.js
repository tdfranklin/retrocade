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
    }

    componentDidUpdate() {
        const snake = this.props.snake;
        for (let i = 0; i < snake.length; i++) {
            this.drawBody(snake[i].x, snake[i].y);
        }
    }

    drawBody(xPos, yPos) {
        const size = this.props.size;
        const color = this.props.color;
        const borderColor = this.props.border;
        BuildRect(borderColor, 'canvas', (xPos * size), (yPos * size), size, size);
        BuildRect(color, 'canvas', (xPos * size + 1), (yPos * size + 1), size - 2, size - 2);
    }

    render() {
        return (
        <div className="Body">
        </div>
        );
    }
}

export default Body;