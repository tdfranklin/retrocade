import React, { Component } from 'react';
import { SetCanvasText, GetCanvas, ResetCanvas, GetRandInt } from '../helpers/helpers';
import Body from '../helpers/snake/body';
import Food from '../helpers/snake/food';

class Snake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            snake: [],
            food: {},
            direction: 'down',
            intervalID: '',
            gameOver: false
        };
    }

    static defaultProps = {
        snakeSize: 15,
        snakeSegment: 4,
        snakeColor: 'darkolivegreen',
        snakeBorder: 'darkgreen',
        foodColor: 'crimson',
        foodBorder: 'chartreuse',
        snakeSpeed: 80
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            setTimeout(() => {
                this.handleDirection(e);
            }, 100);
        });
    }

    componentDidMount() {
        this.startSnake();
        this.createFood();
        const intervalID = setInterval(this.gameLoop.bind(this), this.props.snakeSpeed);
        this.setState({intervalID: intervalID});
    }

    componentWillUpdate() {
        if (this.state.gameOver) {
            clearInterval(this.state.intervalID);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => {
            this.handleDirection(e);
        });
    }

    handleDirection(event) {
        const keyPress = event.key;
        let direction = this.state.direction;

        switch(keyPress) {
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            default:
                break;
            }
        this.setState({direction: direction});
    }

    createFood() {
        const canvas = GetCanvas('canvas');
        const snake = this.state.snake;
        let food = {
            x: GetRandInt(1, ((canvas.width / this.props.snakeSize) - 15)),
            y: GetRandInt(1, ((canvas.height / this.props.snakeSize) - 15))
        }

        for (let i = 0; i > snake.length; i++) {
            const snakeX = snake[i].x;
            const snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY) {
                food.x = GetRandInt(1, ((canvas.width / this.props.snakeSize) - 15));
                food.y = GetRandInt(1, ((canvas.height / this.props.snakeSize) - 15));
            }
        }
        this.setState({food: food});
    }

    checkCollision(xPos, yPos, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x === xPos && arr[i].y === yPos) {
                return true;
            }
        }
        return false;
    }

    startSnake() {
        const length = this.props.snakeSegment;
        const snake = this.state.snake;

        for (let i = (length - 1); i >= 0; i--) {
            snake.push({x: i, y:0});
        }
        this.setState({snake: snake});
    }

    gameLoop() {
        ResetCanvas('black', 'canvas');
        SetCanvasText('white', `Score: ${this.state.score}`, '15px', 8, 20, 'canvas');

        const canvas = GetCanvas('canvas');
        const food = this.state.food;
        const direction = this.state.direction;
        let snakeX = this.state.snake[0].x;
        let snakeY = this.state.snake[0].y;
        let snake = this.state.snake;
        let tail = {};
        let score = this.state.score;

        if (direction === 'right') {
            snakeX++;
        } else if (direction === 'left') {
            snakeX--;
        } else if (direction === 'up') {
            snakeY--;
        } else if (direction === 'down') {
            snakeY++;
        }

        if (snakeX <= -1 || snakeX >= (canvas.width / this.props.snakeSize) ||
            snakeY <= -1 || snakeY >= (canvas.height / this.props.snakeSize) ||
            this.checkCollision(snakeX, snakeY, snake)) {
                this.setState({gameOver: true});
            }

        if (snakeX === food.x && snakeY === food.y) {
            tail = {
                x: snakeX,
                y: snakeY
            }
            score += snake.length * this.props.snakeSpeed;
            this.createFood();
        } else {
            tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        snake.unshift(tail);

        this.setState({
            snake: snake,
            score: score,
        });
    }

    render() {
        return (
        <div className="Snake">
            <Body 
                size={this.props.snakeSize}
                color={this.props.snakeColor}
                border={this.props.snakeBorder}
                snake={this.state.snake}
            />
            <Food
                size={this.props.snakeSize}
                color={this.props.foodColor}
                border={this.props.foodBorder}
                food={this.state.food}
            />
        </div>
        );
    }
}

export default Snake;