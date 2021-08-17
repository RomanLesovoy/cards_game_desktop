import React from 'react';
import GameProvider from './cards/GameProvider';
import CardsList from './cards/CardsList';
import './global.css';
import './app.css';

const App = () => {
    return (
        <div className="app">
            <GameProvider>
                <div className="game-field">
                    <CardsList />
                </div>
            </GameProvider>
        </div>
    );
}

export default App;
