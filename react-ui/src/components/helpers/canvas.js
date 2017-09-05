import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
        <div className="Canvas">
            <canvas
                id={this.props.id}
                height={this.props.height}
                width={this.props.width}
                onClick={this.props.onClick}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                style={this.props.canvasStyle}
            ></canvas>
        </div>
        );
    }
}

export default Canvas;