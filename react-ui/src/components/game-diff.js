import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetCanvasText, LoadImg } from './helpers/helpers';
import { PongInstructions, SnakeInstructions } from './helpers/instructions';
import GameHome from './game-home';
import ThumbsUp from '../assets/img/thumbs-up.jpg';

class GameDifficulty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 'Easy',
            diffSelected: false
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        LoadImg('canvas', ThumbsUp, 215, 125, 400, 400);
        const text = `pick your poison for ${this.props.game}`;
        SetCanvasText('deeppink', text.toUpperCase(), '25px', 75, 50, 'canvas');
        SetCanvasText('aqua', 'Easy', '40px', 10, 45, 'Easy');
        SetCanvasText('aqua', 'Medium', '40px', 10, 45, 'Medium');
        SetCanvasText('aqua', 'Hard', '40px', 10, 45, 'Hard');
    }

    handleClick(e) {
        this.setState({
            difficulty: e.target.id,
            diffSelected: true
        });        
    }

    handleMouseEnter(e) {
        const canvasName = e.target.id;
        SetCanvasText('orange', canvasName, '40px', 10, 45, canvasName);
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        SetCanvasText('aqua', canvasName, '40px', 10, 45, canvasName);
    }

    render() {
        const easyStyle = {
            //border: '2px solid black',
            margin: 'auto auto',
            position: 'absolute',
            top: '25%',
            left: '40%'
        }
        const medStyle = {
            //border: '2px solid black',
            margin: 'auto auto',
            position: 'absolute',
            top: '46%',
            left: '35%'
        }
        const hardStyle = {
            //border: '2px solid black',
            margin: 'auto auto',
            position: 'absolute',
            top: '65%',
            left: '40%'
        }
        return (
        <div className="GameDifficulty">
            {!this.state.diffSelected &&
                <div>
                    <Canvas
                        id={'Easy'}
                        width={175}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={easyStyle}
                    />
                    <Canvas
                        id={'Medium'}
                        width={250}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={medStyle}
                    />
                    <Canvas
                        id={'Hard'}
                        width={175}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={hardStyle}
                    />
                </div>
            }

            {this.props.game === 'Pong' && this.state.diffSelected &&
                <GameHome
                    instructions={PongInstructions}
                    game={this.props.game}
                    difficulty={this.state.difficulty}
                />
            }
            {this.props.game === 'Snake' && this.state.diffSelected &&
                <GameHome
                    instructions={SnakeInstructions}
                    game={this.props.game}
                    difficulty={this.state.difficulty}
                />
            }
        </div>
        );
    }
}

export default GameDifficulty;