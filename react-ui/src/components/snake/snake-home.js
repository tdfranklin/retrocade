import React, { Component } from 'react';
import {SetCanvasText} from '../helpers/helpers';

class SnakeHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        SetCanvasText('white', 'Coming Soon', '35px', 250, 300, 'canvas');
    }

    render() {
        return (
        <div className="SnakeHome">
        </div>
        );
    }
}

export default SnakeHome;