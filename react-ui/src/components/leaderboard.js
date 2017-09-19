import React, { Component } from 'react';
import { SetCanvasText, ResetCanvas, AddCommas, GetCanvas } from './helpers/helpers';
import Canvas from './helpers/canvas';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            inserting: false,
            displaying: false,
            topTen: [],
            initials: '',
            startOver: false
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        ResetCanvas('black', 'canvas');
        this.getTopTen();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.fetching;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.inserting) {
            this.insertNewScore();
        } else {
            if (!this.state.displaying) {
                this.displayTopScores();
            }
            if (GetCanvas('Home')) {
                SetCanvasText('silver', 'Home', '35px', 15, 35, 'Home');
            }            
        }
    }

    //Send GET request to API to get top 10 scores for current game and save to state.
    //Then call to check for new high score and insert it.
    getTopTen() {
        let myHeader = new Headers({
            game: this.props.game
        });
        let myInit = {
            method: 'GET',
            headers: myHeader,
        };
        fetch('/api', myInit)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`status ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            let topTen = [];
            for (let score of data) {
                topTen.push(
                    {
                        name: score.initials,
                        score: score.score
                    }
                )
            }
            this.setState({topTen: topTen});
        })
        .then(() => {
            if (this.checkForHighScore(this.props.score)) {
                this.setState({fetching: false, inserting: true});
                document.addEventListener('keydown', (e) => {
                    this.handleEvent(e);
                });
            } else {
                this.setState({fetching: false});
            }
        });
    }

    //Sends POST request to API with high score if there is a new high score.
    submitHighScore() {
        let myHeader = new Headers({
            game: this.props.game,
            initials: this.state.initials,
            score: this.props.score
        });
        let myInit = {
            method: 'POST',
            headers: myHeader,
        };
        fetch('/api', myInit)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`status ${res.status}`);
            }
        });
    }

    //Compares score to top 10 and returns true if >= any current high score
    checkForHighScore(score) {
        const highScores = this.state.topTen;
        for (let data of highScores) {
            if (score >= data.score) {
                return true;                
            }
        }
    }

    //Loops through high scores and prints text to canvas
    displayTopScores() {
        let num = 1;
        let xPos = 220;
        let yPos = 260;
        const scores = this.state.topTen;
        if (this.state.initials !== '') {
            let newHighScore = {name: this.state.initials, score: this.props.score};
            for (let [index, data] of scores.entries()) {
                if (data.score <= newHighScore.score) {
                    scores.splice(index, 0, newHighScore);
                    scores.pop();
                    break;
                }
            }
        }
        const lastScore = scores.pop();
        ResetCanvas('black', 'canvas');
        SetCanvasText('white', this.props.game.toUpperCase(), '80px', 220, 100, 'canvas');
        SetCanvasText('white', 'High Scores', '30px', 255, 180, 'canvas');
        for (let score of scores) {
            SetCanvasText('white', `${num}.   ${score.name.toUpperCase()}     ${AddCommas(score.score)}`,
            '20px', xPos, yPos, 'canvas');
            num++;
            yPos += 35;
        }
        SetCanvasText('white', `${num}.  ${lastScore.name.toUpperCase()}     ${AddCommas(lastScore.score)}`,
        '20px', xPos, yPos, 'canvas');
        this.setState({displaying: true});
    }

    //Displays text for Add Initials screen
    insertNewScore() {
        ResetCanvas('black', 'canvas');
        SetCanvasText('white', 'Enter Initials', '35px', 170, 100, 'canvas');
        SetCanvasText('white', 'Press Enter to Save', '25px', 170, 200, 'canvas');
        SetCanvasText('white', this.state.initials.toUpperCase(), '50px', 335, 370, 'canvas');
    }

    //Validation and keydown event for Add Initials screen
    handleEvent(event) {
        let newInitials = this.state.initials;
        const keyPress = event.key;

        switch(keyPress) {
            case 'Enter':
                if (newInitials.length < 3) {
                    break;
                } else {
                    this.submitHighScore();
                    this.setState({inserting: false});
                    break;
                }
            case 'Backspace':
                newInitials = newInitials.slice(0, -1);
                break;
            default:
                if (newInitials.length < 3) {
                    if (keyPress.search(/[^a-z]+/) === -1) {
                        newInitials += keyPress;
                    }
                }
                break;
        }        
        this.setState({initials: newInitials});
    }

    //Reloads the page to return back to Home screen
    handleClick(e) {
        window.location.reload()
    }

    handleMouseEnter(e) {
        const canvasName = e.target.id;
        SetCanvasText('orange', canvasName, '35px', 15, 35, canvasName);
    }

    handleMouseLeave(e) {
        const canvasName = e.target.id;
        SetCanvasText('silver', canvasName, '35px', 15, 35, canvasName);
    }

    render() {
        const homeStyle = {
            //border: '2px solid white',
            margin: 'auto auto',
            position: 'absolute',
            bottom: '5%',
            left: '1%'
        }

        return (
        <div className="LeaderBoard">
            {this.state.displaying && !this.state.startOver &&
                <Canvas
                    id={'Home'}
                    width={155}
                    height={40}
                    onClick={this.handleClick.bind(this)}
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)}
                    canvasStyle={homeStyle}
                />
            }
        </div>
        );
    }
}

export default LeaderBoard;