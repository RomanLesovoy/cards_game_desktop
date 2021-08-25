import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
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
    // todo timer to gameManager !!!
    const {
        seconds,
        minutes,
        start,
        pause,
    } = useStopwatch({ autoStart: false });

    return (
        <GameContext.Consumer>
            {(game) => (
                <>
                    <Header
                        openSettings={setOpenedSettings}
                        timerPause={pause}
                        timerStart={start}
                        seconds={seconds}
                        minutes={minutes}
                        game={game}
                    />
                    { openedSettings && <Settings onClose={() => setOpenedSettings(false)} game={game} /> }
                    <GameResults pause={pause} seconds={seconds} minutes={minutes} game={game} />
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
