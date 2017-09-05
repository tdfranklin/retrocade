import React, { Component } from 'react';
import Canvas from '../helpers/canvas';
import {SetCanvasText, ResetCanvas} from '../helpers/helpers';
import Pong from './pong';
import PongDifficulty from './pong-diff';

class PongHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            diff: false
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        const textOne = 'Instructions: Use the Up and Down arrow keys on your';
        const textTwo = 'keyboard to move your paddle up and down to hit the';
        const textThree = 'ball. Try to score a goal against your opponent. The';
        const textFour = 'game is over when your opponent scores 500 or more';
        const textFive = 'points. Can you make it to the leaderboard?';
        SetCanvasText('white', 'Pong', '35px', 350, 50, 'canvas');
        SetCanvasText('white', textOne, '15px', 20, 100, 'canvas');
        SetCanvasText('white', textTwo, '15px', 20, 140, 'canvas');
        SetCanvasText('white', textThree, '15px', 20, 180, 'canvas');
        SetCanvasText('white', textFour, '15px', 20, 220, 'canvas');
        SetCanvasText('white', textFive, '15px', 20, 260, 'canvas');
        SetCanvasText('white', 'Play', '20px', 15, 35, 'Play');
        SetCanvasText('white', 'Difficulty', '20px', 15, 35, 'Difficulty');
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
        SetCanvasText('orange', canvasName, '20px', 15, 35, canvasName);
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        SetCanvasText('white', canvasName, '20px', 15, 35, canvasName);
    }

    render() {
        const playStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            bottom: '25%',
            left: '8%'
        }
        const diffStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            bottom: '25%',
            right: '15%'
        }

        return (
        <div className="PongHome">
            {!this.state.play && !this.state.diff &&
                <div>
                    <Canvas
                        id={'Play'}
                        width={100}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={playStyle}
                    />
                    <Canvas
                        id={'Difficulty'}
                        width={195}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={diffStyle}
                    />
                </div>
            }
            {this.state.play &&
                <Pong />
            }
            {this.state.diff &&
                <PongDifficulty />
            }
        </div>
        );
    }
}

export default PongHome;