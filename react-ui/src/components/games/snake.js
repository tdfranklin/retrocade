import React, { Component } from 'react';
import { SetCanvasText, GetCanvas, ResetCanvas, GetRandInt } from '../helpers/helpers';
import Body from '../helpers/snake/body';
import Food from '../helpers/snake/food';

class Snake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            scoreMod: 50,
            snake: [],
            food: {},
            direction: 'down',
            intervalID: '',
            gameOver: false,
            snakeSpeed: 100
        };
    }

    static defaultProps = {
        snakeSize: 15,
        snakeSegment: 4,
        snakeColor: 'darkolivegreen',
        snakeBorder: 'darkgreen',
        foodColor: 'crimson',
        foodBorder: 'chartreuse'
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => {
            setTimeout(() => {
                this.handleDirection(e);
            }, 100);
        });
        this.setDifficulty();
    }

    componentDidMount() {
        this.startSnake();
        this.createFood();
        const intervalID = setInterval(this.gameLoop.bind(this), this.state.snakeSpeed);
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

    setDifficulty() {
        //Makes changes to state based on difficulty setting.
        if (this.props.difficulty === 'Medium') {
            this.setState({
                snakeSpeed: 80,
                scoreMod: 70
            });
        }
        if (this.props.difficulty === 'Hard') {
            this.setState({
                snakeSpeed: 60,
                scoreMod: 90
            });
        }
    }

    handleDirection(event) {
        const keyPress = event.key;
        let direction = this.state.direction;

        //Sets direction in state based on keyboard input.
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
        //Creates food by generating a random X and Y coordinate and saving to state.
        let food = {
            x: GetRandInt(2, ((canvas.width / this.props.snakeSize) - 1)),
            y: GetRandInt(2, ((canvas.height / this.props.snakeSize) - 1))
        }

        //Checks to see if food coordinates are the same as snake and if so will
        //generate new coordinates for food.
        for (let i = 0; i > snake.length; i++) {
            const snakeX = snake[i].x;
            const snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY) {
                this.createFood();
                break;
            }
        }
        this.setState({food: food});
    }

    checkCollision(xPos, yPos, arr) {
        //takes snake head X and Y position and checks to see if it is touching any other
        //segment of the snake body.  Returns boolean based on outcome.
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

        //Creates initial snake based on snakeSegment props.
        for (let i = (length - 1); i >= 0; i--) {
            snake.push({x: i, y:0});
        }
        this.setState({snake: snake});
    }

    gameLoop() {
        //Reset and redraw canvas.
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

        //Moves the snake in correct direction based on keyboard input.
        if (direction === 'right') {
            snakeX++;
        } else if (direction === 'left') {
            snakeX--;
        } else if (direction === 'up') {
            snakeY--;
        } else if (direction === 'down') {
            snakeY++;
        }

        //Check to see if snake head collides with edge of canvas or itself and sets
        //gameOver state if it does.
        if (snakeX <= -1 || snakeX >= (canvas.width / this.props.snakeSize) ||
            snakeY <= -1 || snakeY >= (canvas.height / this.props.snakeSize) ||
            this.checkCollision(snakeX, snakeY, snake)) {
                this.setState({gameOver: true});
            }

        //If the snake head touches the food, it will create a new snake segment,
        //generate a new food and score.
        if (snakeX === food.x && snakeY === food.y) {
            tail = {
                x: snakeX,
                y: snakeY
            }
            score += snake.length * this.state.scoreMod;
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