import React, { Component } from 'react';
import { SetCanvasText, ResetCanvas, AddCommas, GetCanvas, LoadImg } from './helpers/helpers';
import Canvas from './helpers/canvas';
import RetroMountain from '../assets/img/retro-mountain.jpg';
import HighScore from '../assets/img/high-score.png';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            inserting: false,
            displaying: false,
            topTen: [],
            lastScore: '',
            initials: ''
        };
    }

    static defaultProps = {
    }

    componentDidMount() {
        ResetCanvas('black', 'canvas');
        LoadImg('canvas', RetroMountain, 50, 50, 725, 525);
        this.getTopTen();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.fetching;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.inserting) {
            ResetCanvas('black', 'canvas');
            LoadImg('canvas', HighScore, 50, 50, 725, 525, this.insertNewScore.bind(this));
        } else {
            if (!this.state.displaying) {
                ResetCanvas('black', 'canvas');
                LoadImg('canvas', RetroMountain, 50, 15, 725, 575, this.displayTopScores.bind(this));
            }
            if (GetCanvas('Home')) {
                SetCanvasText('maroon', 'Home', '35px', 15, 35, 'Home');
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
        let lastScore = this.state.lastScore;
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
        if (scores.length === 10) {
            lastScore = scores.pop();
        }
        SetCanvasText('deeppink', this.props.game.toUpperCase(), '80px', 220, 100, 'canvas');
        SetCanvasText('gold', 'High Scores', '30px', 255, 180, 'canvas');
        for (let score of scores) {
            SetCanvasText('lime', `${num}.   ${score.name.toUpperCase()}     ${AddCommas(score.score)}`,
            '20px', xPos, yPos, 'canvas');
            num++;
            yPos += 35;
        }
        SetCanvasText('lime', `${num}.  ${lastScore.name.toUpperCase()}     ${AddCommas(lastScore.score)}`,
        '20px', xPos, yPos, 'canvas');        
        this.setState({displaying: true, initials: '', lastScore: lastScore});
    }

    //Displays text for Add Initials screen
    insertNewScore() {
        SetCanvasText('fuchsia', 'Enter Initials', '50px', 65, 75, 'canvas');
        SetCanvasText('lime', 'Type 3 Lowercase Letters', '25px', 110, 150, 'canvas');
        SetCanvasText('lime', 'Press Enter to Save', '25px', 180, 200, 'canvas');
        SetCanvasText('cyan', this.state.initials.toUpperCase(), '70px', 325, 370, 'canvas');
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
        SetCanvasText('maroon', canvasName, '35px', 15, 35, canvasName);
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
            {this.state.displaying &&
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