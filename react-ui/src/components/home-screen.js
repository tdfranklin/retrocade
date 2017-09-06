import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetDefaultCanvas, SetCanvasText, ResetCanvas, SetCanvasBorder } from './helpers/helpers';
import PongHome from './pong/pong-home';
import SnakeHome from './snake/snake-home';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSelected: false,
            game: null
        };
    }

    newGame(name, color) {
        SetCanvasBorder(color, name, 5);
        SetCanvasText(color, name, '25px', 75, 135, name);
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
        this.newGame('Pong', 'white');
        this.newGame('Snake', 'white');
    }

    handleMouseEnter(e) {
        const canvasName = e.target.id;
        this.newGame(canvasName, 'orange');
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        this.newGame(canvasName, 'white');
    }

    render() {
        const pongStyle = {
            margin: 'auto auto',
            position: 'absolute',
            zIndex: '1',
            bottom: '5%',
            left: '5%'
        }
        const snakeStyle = {
            margin: 'auto auto',
            position: 'absolute',
            zIndex: '1',
            bottom: '5%',
            right: '5%'
        }

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
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={pongStyle}
                    />
                    <Canvas
                        id={'Snake'}
                        width={250}
                        height={250}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={snakeStyle}
                    />
                </div>
            }
            {this.state.game === 'Pong' &&
                <PongHome />
            }
            {this.state.game === 'Snake' &&
                <SnakeHome />
            }
        </div>
        );
    }
}

export default HomeScreen;