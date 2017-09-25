import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetCanvasText, ResetCanvas, LoadImg } from './helpers/helpers';
import GameDifficulty from './game-diff';
import Pong from './games/pong';
import Snake from './games/snake';
import RetroStyle from '../assets/img/retrostyle.jpg';

class GameHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            diff: false
        };
    }

    static defaultProps = {
        difficulty: 'Easy'
    }

    componentDidMount() {
        LoadImg('canvas', RetroStyle, 25, 25, 775, 550, this.loadInstructions.bind(this));
        SetCanvasText('indigo', 'Play', '35px', 10, 40, 'Play');
        SetCanvasText('indigo', 'Difficulty', '35px', 10, 40, 'Difficulty');        
    }

    //Draws instructions on the canvas
    loadInstructions() {
        const game = this.props.game;
        const instructions = this.props.instructions;
        let yPos = 100;

        SetCanvasText('deeppink', game, '50px', 300, 55, 'canvas');        

        for (let line of Object.entries(instructions)) {
            SetCanvasText('chartreuse', line[1], '25px', 20, yPos, 'canvas');
            yPos += 40;
        }
    }

    handleClick(e) {
        if (e.target.id === 'Play') {
            this.setState({play: true});
        }
        if (e.target.id === 'Difficulty') {
            this.setState({diff: true});
        }
        ResetCanvas('black', 'canvas');
    }

    handleMouseEnter(e) {
        const canvasName = e.target.id;
        SetCanvasText('darkorange', canvasName, '35px', 10, 40, canvasName);
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        SetCanvasText('indigo', canvasName, '35px', 10, 40, canvasName);
    }

    render() {
        const playStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            bottom: '10%',
            left: '5%'
        }
        const diffStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            bottom: '10%',
            right: '5%'
        }

        return (
        <div className="GameHome">
            {!this.state.play && !this.state.diff &&
                <div>
                    <Canvas
                        id={'Play'}
                        width={150}
                        height={45}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={playStyle}
                    />
                    <Canvas
                        id={'Difficulty'}
                        width={330}
                        height={45}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={diffStyle}
                    />
                </div>
            }
            {this.state.play && this.props.game === 'Pong' &&
                <Pong
                    difficulty={this.props.difficulty}
                />
            }
            {this.state.play && this.props.game === 'Snake' &&
                <Snake
                    difficulty={this.props.difficulty}
                />
            }
            {this.state.diff &&
                <GameDifficulty
                    game={this.props.game}
                />
            }
        </div>
        );
    }
}

export default GameHome;