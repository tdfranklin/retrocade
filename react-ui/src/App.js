import React, { Component } from 'react';
import './App.css';
import HomeScreen from './components/home-screen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <HomeScreen />
      </div>
    );
  }
}

export default App;