import React, { useState } from 'react';
import GameProvider from './cards/GameProvider';
import CardsList from './cards/CardsList';
import Header from './partials/header/Header';
import Settings from './settings/Settings';
import helpers from './helpers';
import './global.css';
import './app.css';

const Manager = () => {
    const [openedSettings, setOpenedSettings] = useState(false);

    return (
        <>
            <Header openSettings={setOpenedSettings} />
            { openedSettings && <Settings onClose={() => setOpenedSettings(false)} /> }
        </>
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
