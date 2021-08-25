import React, { useState } from 'react';
import GameProvider from './cards/GameProvider';
import CardsList from './cards/CardsList';
import Header from './partials/header/Header';
import Settings from './settings/Settings';
import { GameContext } from './cards/GameProvider';
import GameResults from './cards/results/GameResults';
import helpers from './helpers';
import './global.css';
import './app.css';

const Manager = () => {
    const [openedSettings, setOpenedSettings] = useState(false);

    return (
        <GameContext.Consumer>
            {(game) => (
                <>
                    <Header
                        openSettings={setOpenedSettings}
                        seconds={game.timer.seconds}
                        minutes={game.timer.minutes}
                        game={game}
                    />
                    { openedSettings && (
                        <Settings
                            onClose={() => setOpenedSettings(false)}
                            game={game}
                        />
                    )}
                    <GameResults
                        seconds={game.timer.seconds}
                        minutes={game.timer.minutes}
                        game={game}
                    />
                </>
            )}
        </GameContext.Consumer>
    );
}

const App = () => {
    const gameBg = helpers.getGameBg();

    return (
        <div className="app" id="app" style={{ backgroundImage: `url(${gameBg})` }}>
            <GameProvider>
                <Manager />
                <CardsList />
            </GameProvider>
        </div>
    );
}

export default App;
