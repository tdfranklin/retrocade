import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetDefaultCanvas, SetCanvasText, ResetCanvas } from './helpers/helpers';
import Pong from './pong';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [],
            gameSelected: false,
            game: null
        };
    }

    newGame(name) {
        SetCanvasText('white', name, '25px', 75, 135, name)
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            gameSelected: true,
            game: e.target.id
        });
        ResetCanvas('black', 'canvas');
    }

    componentDidMount() {
        SetDefaultCanvas('black', 'canvas');
        SetCanvasText('white', 'Choose Your Game', '25px', 200, 35, 'canvas');
        this.newGame('Pong');
        this.newGame('Snake');
    }

    render() {
        return (
        <div className="HomeScreen">
            <Canvas
                id='canvas'
                width={815}
                height={615}
            />
            {!this.state.gameSelected &&
                <div>
                    <Canvas
                        id={'Pong'}
                        width={250}
                        height={250}
                        onClick={this.handleClick.bind(this)}
                    />
                    <Canvas
                        id={'Snake'}
                        width={250}
                        height={250}
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
            }
            {this.state.game === 'Pong' &&
                <Pong />
            }
        </div>
        );
    }
}

export default HomeScreen;