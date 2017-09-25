import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetDefaultCanvas, SetCanvasText, ResetCanvas, SetCanvasBorder, LoadImg } from './helpers/helpers';
import { PongInstructions, SnakeInstructions } from './helpers/instructions';
import GameHome from './game-home';
import Retrocade from '../assets/img/retrocade.jpg';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSelected: false,
            game: null
        };
    }

    componentDidMount() {
        SetDefaultCanvas('black', 'canvas');
        SetCanvasText('deeppink', 'Choose Your Game', '40px', 80, 50, 'canvas');
        this.newGame('Pong', 'lime');
        this.newGame('Snake', 'lime');
        LoadImg('canvas', Retrocade, 50, 75, 700, 450);
    }

    newGame(name, color) {
        SetCanvasBorder(color, name, 6);
        SetCanvasText(color, name, '35px', 20, 120, name);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            gameSelected: true,
            game: e.target.id
        });
        ResetCanvas('black', 'canvas');
    }    

    handleMouseEnter(e) {
        const canvasName = e.target.id;
        this.newGame(canvasName, 'darkorange');
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        this.newGame(canvasName, 'lime');
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
                        width={200}
                        height={200}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={pongStyle}
                    />
                    <Canvas
                        id={'Snake'}
                        width={200}
                        height={200}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={snakeStyle}
                    />
                </div>
            }
            {this.state.game === 'Pong' &&
                <GameHome
                    instructions={PongInstructions}
                    game={this.state.game}
                />
            }
            {this.state.game === 'Snake' &&
                <GameHome
                    instructions={SnakeInstructions}
                    game={this.state.game}
                />
            }
        </div>
        );
    }
}

export default HomeScreen;