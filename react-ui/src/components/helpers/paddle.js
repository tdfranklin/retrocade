import React, { Component } from 'react';
import { BuildRect } from './helpers';

class Paddle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
    }

    componentWillMount() {
        BuildRect('white', 'canvas', this.props.xPos, this.props.yPos, this.props.width, this.props.height);
    }

    componentDidMount() {
        BuildRect('white', 'canvas', this.props.xPos, this.props.yPos, this.props.width, this.props.height);
    }

    componentWillUnmount() {
    }

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