import React, { Component } from 'react';
import Canvas from './helpers/canvas';
import { SetCanvasText } from './helpers/helpers';
import { PongInstructions, SnakeInstructions } from './helpers/instructions';
import GameHome from './game-home';

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
        const text = this.props.game;
        SetCanvasText('white', text, '35px', 350, 50, 'canvas');
        SetCanvasText('white', 'Easy', '20px', 15, 35, 'Easy');
        SetCanvasText('white', 'Medium', '20px', 15, 35, 'Medium');
        SetCanvasText('white', 'Hard', '20px', 15, 35, 'Hard');
    }

    handleClick(e) {
        this.setState({
            difficulty: e.target.id,
            diffSelected: true
        });        
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
        const easyStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            top: '25%',
            left: '45%'
        }
        const medStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            top: '45%',
            left: '43%'
        }
        const hardStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            top: '65%',
            left: '45%'
        }
        return (
        <div className="GameDifficulty">
            {!this.state.diffSelected &&
                <div>
                    <Canvas
                        id={'Easy'}
                        width={100}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={easyStyle}
                    />
                    <Canvas
                        id={'Medium'}
                        width={150}
                        height={50}
                        onClick={this.handleClick.bind(this)}
                        onMouseEnter={this.handleMouseEnter.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        canvasStyle={medStyle}
                    />
                    <Canvas
                        id={'Hard'}
                        width={100}
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
                    lineOne={PongInstructions.lineOne}
                    lineTwo={PongInstructions.lineTwo}
                    lineThree={PongInstructions.lineThree}
                    lineFour={PongInstructions.lineFour}
                    lineFive={PongInstructions.lineFive}
                    game={this.props.game}
                    difficulty={this.state.difficulty}
                />
            }
            {this.props.game === 'Snake' && this.state.diffSelected &&
                <GameHome
                    lineOne={SnakeInstructions.lineOne}
                    lineTwo={SnakeInstructions.lineTwo}
                    lineThree={SnakeInstructions.lineThree}
                    lineFour={SnakeInstructions.lineFour}
                    lineFive={SnakeInstructions.lineFive}
                    game={this.props.game}
                    difficulty={this.state.difficulty}
                />
            }
        </div>
        );
    }
}

export default GameDifficulty;