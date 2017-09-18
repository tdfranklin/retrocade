import React, { Component } from 'react';
import { SetDefaultCanvas, GetCanvas, GetContext, SetCanvasText } from '../helpers/helpers';
import Paddle from '../helpers/pong/paddle';
import Ball from '../helpers/pong/ball';
import LeaderBoard from '../leaderboard';

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
                xPos: 785,
                yPos: 250,
                width: 20,
                height: 100,
                speed: 3,
                offset: 30
            },
            ball: {
                xPos: 400,
                yPos: 300,
                radius: 8,
                xSpeed: 3,
                ySpeed: 0,
                serve: 'right',
                maxSpeed: 7,
                diffSpeed: 3
            },
            endScore: 5,
            intervalID: '',
            gameOver: false
        };
        this.keyState = {};
    }

    static defaultProps = {
        game: 'pong'
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            this.keyState[e.key] = true;
        });

        document.addEventListener('keyup', (e) => {
            delete this.keyState[e.key];
        });
        this.setDifficulty();
    }

    componentDidMount() {
        const intervalID = setInterval(this.moveBall.bind(this), 1000/60);
        this.setState({intervalID: intervalID});
    }

    componentWillUpdate() {
        if (this.state.gameOver) {
            clearInterval(this.state.intervalID);
        }
        if (!this.state.gameOver) {
            this.redrawCanvas();
            setTimeout(() => {
                this.movePaddle();
                this.moveComputerPaddle();
            }, 200);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => {
            this.keyState[e.key] = true;
        });

        document.removeEventListener('keyup', (e) => {
            delete this.keyState[e.key];
        });
    }

    setDifficulty() {
        //Makes changes to state based on difficulty setting.
        if (this.props.difficulty === 'Medium') {
            this.setState((prevState) => {
                prevState.ball.xSpeed += 1;
                prevState.ball.diffSpeed += 1;
                prevState.ball.maxSpeed += 1;
                prevState.scores.multiplier += 5;
                return prevState;
            });
        }
        if (this.props.difficulty === 'Hard') {
            this.setState((prevState) => {
                prevState.ball.xSpeed += 2;
                prevState.ball.diffSpeed += 2;
                prevState.ball.maxSpeed += 2;
                prevState.computerPaddle.offset += 20;
                prevState.computerPaddle.speed += 4;
                prevState.scores.multiplier += 10;
                return prevState;
            });
        }
    }

    redrawCanvas() {
        const canvas = GetCanvas('canvas');
        const context = GetContext('canvas');
        const size = 10;
        //Reset and redraw canvas.
        SetDefaultCanvas('black', 'canvas');
        SetCanvasText('white', `Score: ${this.state.scores.player}`, '15px', 125, 20, 'canvas');
        SetCanvasText('white', `Score: ${this.state.scores.computer}`, '15px', 550, 20, 'canvas');
        //Line down the middle of canvas.
        for(let x = 0; x < canvas.height; x += size*2) {
            context.fillRect(canvas.width / 2 - size / 2, x, size, size);
        }
    }

    movePaddle() {
        const canvas = GetCanvas('canvas');
        const paddleY = this.state.playerPaddle.yPos;
        const paddleH = this.state.playerPaddle.height;

        //Move player paddle up unless at top of canvas.
        if (this.keyState['ArrowUp']) {
            if (paddleY < 2) {
                return true;
            } else {
                this.setState((prevState) => {
                    prevState.playerPaddle.yPos -= prevState.playerPaddle.speed;
                    return prevState;
                });
            }
        }
        //Move player paddle down unless at bottom of canvas.
        if (this.keyState['ArrowDown']) {
            if (paddleY + paddleH >= canvas.height - 2) {
                return true;
            } else {
                this.setState((prevState) => {
                    prevState.playerPaddle.yPos += prevState.playerPaddle.speed;
                    return prevState;
                });
            }
        }
    }

    moveComputerPaddle() {
        const canvas = GetCanvas('canvas');
        const ballY = this.state.ball.yPos;
        const paddleY = this.state.computerPaddle.yPos;
        const paddleH = this.state.computerPaddle.height;
        const offset = this.state.computerPaddle.offset;

        //AI paddle follows ball up unless at top of canvas.
        if (ballY < paddleY) {
            if (paddleY < 2) {
                return true;
            } else {
                this.setState((prevState) => {
                    prevState.computerPaddle.yPos -= prevState.computerPaddle.speed;
                    return prevState;
                });
            }
        //AI paddle follows ball down unless at bottom of canvas.
        } else if (ballY > paddleY + offset) {
            if ( (paddleY + paddleH) > canvas.height - 2) {
                return true;
            } else {
                this.setState((prevState) => {
                    prevState.computerPaddle.yPos += prevState.computerPaddle.speed;
                    return prevState;
                });
            }
        }
    }

    moveBall() {
        const canvas = GetCanvas('canvas');
        const ballX = this.state.ball.xPos;
        const ballY = this.state.ball.yPos;
        const radius = this.state.ball.radius;
        const maxSpeed = this.state.ball.maxSpeed;
        const diffSpeed = this.state.ball.diffSpeed;
        const ballTop = ballY - radius;
        const ballBottom = ballY + radius;
        const ballLeft = ballX - radius;
        const ballRight = ballX + radius;
        const player = this.state.playerPaddle;
        const computer = this.state.computerPaddle;

        //Move ball across the screen.
        this.setState((prevState) => {
            prevState.ball.xPos += prevState.ball.xSpeed;
            prevState.ball.yPos -= prevState.ball.ySpeed;
            return prevState;
        });

        //Redirect ball if it hits top or bottom of canvas.
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

        //If ball makes it past left paddle, score right player points and reset ball.
        if (ballLeft <= 0) {
            this.setState((prevState) => {
                prevState.scores.computer += 1;
                prevState.scores.bounces = 0;
                prevState.ball.xSpeed = diffSpeed;
                prevState.ball.ySpeed = 0;
                prevState.ball.xPos = (canvas.width / 2);
                prevState.ball.yPos = (canvas.height / 2);
                prevState.ball.serve = 'right';
                return prevState;
            });
            if (this.state.scores.computer >= this.state.endScore) {
                this.setState({gameOver: true});
            }
        }

        //If ball makes it past right paddle, score left player points and reset ball.
        if (ballRight >= canvas.width) {
            this.setState((prevState) => {
                prevState.scores.player += prevState.scores.bounces * prevState.scores.multiplier;
                prevState.scores.bounces = 0;
                prevState.ball.xSpeed = -diffSpeed;
                prevState.ball.ySpeed = 0;
                prevState.ball.xPos = (canvas.width / 2);
                prevState.ball.yPos = (canvas.height / 2);
                prevState.ball.serve = 'left';
                return prevState;
            });
        }

        //Check for ball collision with right paddle.
        if(ballX > canvas.width / 2) {
            if (ballRight >= computer.xPos && ballLeft <= computer.xPos &&
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
        //Check for ball collision with left paddle.
        } else {
            if (ballLeft <= (player.xPos + player.width) && ballRight > player.xPos &&
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
            {!this.state.gameOver &&
                <div>
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
                    />
                </div>
            }
            {this.state.gameOver &&
                <LeaderBoard
                    game={this.props.game}
                    score={this.state.scores.player}
                />
            }
        </div>
        );
    }
}

export default Pong;