import React from 'react';
import { GameContext } from '../../cards/GameProvider';
import Button from '../../controls/button/Button';
import './header.css';

const Header = ({ openSettings = () => {} }: { openSettings: Function }) => {
    return (
        <GameContext.Consumer>
            {(game) => (
                <header className="header">
                    <Button
                        onClick={() => game.setPlayGame(!game.playGame)}
                        value={game.playGame ? 'Pause game' : 'Play game'}
                    />
                    <Button
                        onClick={() => openSettings(true)}
                        value={'Settings'}
                    />
                </header>
            )}
        </GameContext.Consumer>
    );
}

export default Header;
