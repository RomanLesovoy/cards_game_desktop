import React from 'react';
import GameProvider from './cards/GameProvider';
import CardsList from './cards/CardsList';

const App = () => {
    return (
        <GameProvider>
            <div className="App">
                <CardsList />
            </div>
        </GameProvider>
    );
}

export default App;
