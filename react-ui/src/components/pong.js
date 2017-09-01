import React, { Component } from 'react';
import { SetDefaultCanvas, GetCanvas, GetContext, SetCanvasText } from './helpers/helpers';
import Paddle from './helpers/paddle';
import Ball from './helpers/ball';

class Pong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: {
                player: 0,
                computer: 0,
                bounces: 0,
                multiplier: 10
            },
            playerPaddle: {
                xPos: 10,
                yPos: 250,
                width: 20,
                height: 100,
                speed: 8
            },
            computerPaddle: {
                xPos: 775,
                yPos: 250,
                width: 20,
                height: 100,
                speed: 3
            },
            ball: {
                xPos: 400,
                yPos: 300,
                radius: 8,
                xSpeed: 2,
                ySpeed: 0,
                serve: 'right',
                maxSpeed: 6
            }
        };
        this.keyState = {};
    }

    static defaultProps = {
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            this.keyState[e.key] = true;
        });

        document.addEventListener('keyup', (e) => {
            delete this.keyState[e.key];
        });
    }

    componentDidMount() {
        this.redrawCanvas();
        setInterval(this.moveBall.bind(this), 1000/60);
    }

    componentWillUpdate() {
        this.redrawCanvas();
        setTimeout(() => {
            this.movePaddle();
            const canvas = GetCanvas('canvas');
            if (this.state.ball.yPos < this.state.computerPaddle.yPos) {
                if (this.state.computerPaddle.yPos < 2) {
                    return true;
                } else {
                    this.setState((prevState) => {
                        prevState.computerPaddle.yPos -= prevState.computerPaddle.speed;
                        return prevState;
                    });
                }
            } else if (this.state.ball.yPos > this.state.computerPaddle.yPos + 60) {
                if ( (this.state.computerPaddle.yPos + this.state.computerPaddle.height) > canvas.height) {
                    return true;
                } else {
                    this.setState((prevState) => {
                        prevState.computerPaddle.yPos += prevState.computerPaddle.speed;
                        return prevState;
                    });
                }
            }
        }, 200);
        console.log(this.state.ball.xSpeed);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => {
            this.keyState[e.key] = true;
        });

        document.removeEventListener('keyup', (e) => {
            delete this.keyState[e.key];
        });
    }

    redrawCanvas() {
        const canvas = GetCanvas('canvas');
        const context = GetContext('canvas');
        const size = 10;
        SetDefaultCanvas('black', 'canvas');
        SetCanvasText('white', `Score: ${this.state.scores.player}`, '15px', 125, 20, 'canvas');
        SetCanvasText('white', `Score: ${this.state.scores.computer}`, '15px', 550, 20, 'canvas');
        for(let x=0; x<canvas.height;x+=size*2) {
            context.fillRect(canvas.width / 2 - size / 2, x, size, size);
        }
    }

    movePaddle() {
        const canvas = GetCanvas('canvas');
        if (this.keyState['ArrowUp']) {
            this.setState((prevState) => {
                prevState.playerPaddle.yPos -= prevState.playerPaddle.speed;
                return prevState;
            });
        }
        if (this.keyState['ArrowDown']) {
            this.setState((prevState) => {
                prevState.playerPaddle.yPos += prevState.playerPaddle.speed;
                return prevState;
            });
        }
        if (this.state.playerPaddle.yPos < 2) {
            this.setState((prevState) => {
                prevState.playerPaddle.yPos = 2;
                return prevState;
            });
        }
        if ( (this.state.playerPaddle.yPos + this.state.playerPaddle.height) > canvas.height) {
            this.setState((prevState) => {
                prevState.playerPaddle.yPos = canvas.height - this.state.playerPaddle.height;
                return prevState;
            });
        }
    }

    moveBall() {
        const canvas = GetCanvas('canvas');
        const ballX = this.state.ball.xPos;
        const ballY = this.state.ball.yPos;
        const radius = this.state.ball.radius;
        const maxSpeed = this.state.ball.maxSpeed;
        const ballTop = ballY - radius;
        const ballBottom = ballY + radius;
        const ballLeft = ballX - radius;
        const ballRight = ballX + radius;
        const player = this.state.playerPaddle;
        const computer = this.state.computerPaddle;

        this.setState((prevState) => {
            prevState.ball.xPos += prevState.ball.xSpeed;
            prevState.ball.yPos -= prevState.ball.ySpeed;
            return prevState;
        });

        if (ballTop < 0) {
            this.setState((prevState) => {
                prevState.ball.yPos = prevState.ball.radius;
                prevState.ball.ySpeed *= -1;
                return prevState;
            });
        } else if (ballBottom > canvas.height) {
            this.setState((prevState) => {
                prevState.ball.yPos = canvas.height - prevState.ball.radius;
                prevState.ball.ySpeed *= -1;
                return prevState;
            });
        }

        if (ballLeft < 0) {
            this.setState((prevState) => {
                prevState.scores.computer += prevState.scores.bounces * prevState.scores.multiplier;
                prevState.scores.bounces = 0;
                prevState.ball.xSpeed = 2;
                prevState.ball.ySpeed = 0;
                prevState.ball.xPos = (canvas.width / 2);
                prevState.ball.yPos = (canvas.height / 2);
                prevState.ball.serve = 'right';
                return prevState;
            });
        }
        if (ballRight > canvas.width) {
            this.setState((prevState) => {
                prevState.scores.player += prevState.scores.bounces * prevState.scores.multiplier;
                prevState.scores.bounces = 0;
                prevState.ball.xSpeed = -2;
                prevState.ball.ySpeed = 0;
                prevState.ball.xPos = (canvas.width / 2);
                prevState.ball.yPos = (canvas.height / 2);
                prevState.ball.serve = 'left';
                return prevState;
            });
        }

        if(ballX > canvas.width / 2) {
            if(ballRight > (computer.xPos) && ballLeft < (computer.xPos + computer.width) &&
                ballTop < (computer.yPos + computer.height) && ballBottom > computer.yPos) {
                if (this.state.ball.serve === 'right') {
                    this.setState((prevState) => {
                        prevState.scores.bounces += 1;
                        prevState.ball.xSpeed = prevState.ball.xSpeed >= maxSpeed ? -maxSpeed : prevState.ball.xSpeed * -1.2;
                        prevState.ball.ySpeed += Math.random() < 0.5 ? 2 : -2;
                        prevState.ball.xPos += prevState.ball.xSpeed;
                        prevState.ball.serve = 'left';
                        return prevState;
                    });
                }
            }
        } else {
            if(ballLeft < (player.xPos + player.width) && ballRight > (player.xPos) &&
                ballTop < (player.yPos + player.height) && ballBottom > player.yPos) {
                if (this.state.ball.serve === 'left') {
                    this.setState((prevState) => {
                        prevState.scores.bounces += 1;
                        prevState.ball.xSpeed = prevState.ball.xSpeed >= maxSpeed ? maxSpeed : prevState.ball.xSpeed * -1.2;
                        prevState.ball.ySpeed += Math.random() < 0.5 ? 2 : -2;
                        prevState.ball.xPos += prevState.ball.xSpeed;
                        prevState.ball.serve = 'right';
                        return prevState;
                    });
                }
            }
        }
    }

    render() {
        return (
        <div className="Pong">
            <Paddle
                xPos={this.state.playerPaddle.xPos}
                yPos={this.state.playerPaddle.yPos}
                height={this.state.playerPaddle.height}
                width={this.state.playerPaddle.width}
            />
            <Paddle
                xPos={this.state.computerPaddle.xPos}
                yPos={this.state.computerPaddle.yPos}
                height={this.state.computerPaddle.height}
                width={this.state.computerPaddle.width}
            />
            <Ball
                xPos={this.state.ball.xPos}
                yPos={this.state.ball.yPos}
                radius={this.state.ball.radius}
                playerPaddle={this.state.playerPaddle}
                computerPaddle={this.state.computerPaddle}
            />
        </div>
        );
    }
}

export default Pong;