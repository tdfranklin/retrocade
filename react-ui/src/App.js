import React, { Component } from 'react';
import './App.css';
import HomeScreen from './components/home-screen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <HomeScreen />
      </div>
    );
  }
}
/*
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello, World!</h2>
        </div>
        <p className="App-intro">
          <br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}
*/
export default App;