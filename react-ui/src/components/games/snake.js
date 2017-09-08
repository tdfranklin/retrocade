import React, { Component } from 'react';
import { SetCanvasText, GetCanvas, ResetCanvas, BuildRect } from '../helpers/helpers';
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
        snakeSize: 10,
        snakeSegment: 4,
        snakeColor: 'white',
        foodColor: 'green'
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            //console.log(e.key);
            const keyPress = e.key;
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
        });
    }

    componentDidMount() {
        //SetCanvasText('white', 'Coming Soon', '35px', 250, 300, 'canvas');
        SetCanvasText('white', `Score: ${this.state.score}`, '15px', 8, 20, 'canvas');
        this.startSnake();
        this.createFood();
        const intervalID = setInterval(this.gameLoop.bind(this), 80);
        this.setState({intervalID: intervalID});
        //console.log(this.state.snake);
    }

    componentWillUpdate() {
        //this.gameLoop();
        if (this.state.gameOver) {
            clearInterval(this.state.intervalID);
        }
        //console.log(this.state.gameOver);
    }

    componentDidUpdate() {
        //console.log(this.state.direction);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => {
            //console.log(e.key);
            const keyPress = e.key;
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
        });
    }

    createFood() {
        const canvas = GetCanvas('canvas');
        const snake = this.state.snake;
        let food = {
            x: Math.floor((Math.random() * (70)) + 1),
            y: Math.floor((Math.random() * (50)) + 1)
        }

        for (let i = 0; i > snake.length; i++) {
            const snakeX = snake[i].x;
            const snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY ||
                food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
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

    drawBody(xPos, yPos) {
        const size = this.props.snakeSize;
        const color = this.props.snakeColor;
        BuildRect(color, 'canvas', (xPos * size), (yPos * size), size, size);
    }

    drawFood(xPos, yPos) {
        const size = this.props.snakeSize;
        const color = this.props.foodColor;
        BuildRect(color, 'canvas', (xPos * size), (yPos * size), size, size);
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

        if (snakeX === -1 || snakeX === (canvas.width / this.props.snakeSize) ||
            snakeY === -1 || snakeY === (canvas.height / this.props.snakeSize) ||
            this.checkCollision(snakeX, snakeY, snake)) {
                this.setState({gameOver: true});
            }

        if (snakeX === food.x && snakeY === food.y) {
            tail = {
                x: snakeX,
                y: snakeY
            }
            score++;
            this.createFood();
        } else {
            tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        snake.unshift(tail);

        for (let i = 0; i < snake.length; i++) {
            this.drawBody(snake[i].x, snake[i].y);
        }

        this.drawFood(food.x, food.y);

        this.setState({
            snake: snake,
            score: score,
        });
    }

    render() {
        return (
        <div className="Snake">
        </div>
        );
    }
/*
    render() {
        return (
        <div className="Snake">
            <Body 
                size={this.props.snakeSize}
                color={this.props.snakeColor}
            />
            <Food
                size={this.props.snakeSize}
                color={this.props.foodColor}
            />
        </div>
        );
    }
*/
}

export default Snake;