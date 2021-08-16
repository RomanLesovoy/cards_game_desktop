import React, { Component } from 'react';
import GameProvider from './cards/GameProvider';
import CardsList from './cards/CardsList';

class App extends Component {
  render() {
    return (
      <GameProvider>
        <div className="App">
          <CardsList />
        </div>
      </GameProvider>
    );
  }
}

export default App;
