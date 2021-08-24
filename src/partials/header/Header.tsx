import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { GameContext } from '../../cards/GameProvider';
import Button from '../../controls/button/Button';
import helpers from '../../helpers';
import './header.css';

const Header = ({ openSettings = () => {} }: { openSettings: Function }) => {
    const {
        seconds,
        minutes,
        start,
        pause,
    } = useStopwatch({ autoStart: false });

    return (
        <GameContext.Consumer>
            {(game) => (
                <header className="header">
                    <Button
                        onClick={() => {
                            game.setPlayGame(!game.playGame);
                            game.playGame ? pause() : start();
                        }}
                        value={game.playGame ? 'Pause game' : 'Play game'}
                    />
                    <Button
                        onClick={() => openSettings(true)}
                        value={'Settings'}
                    />
                    <div className="timer">
                        <span>
                            { helpers.formatTimeWithZero(minutes) } : { helpers.formatTimeWithZero(seconds) }
                        </span>
                    </div>
                </header>
            )}
        </GameContext.Consumer>
    );
}

export default Header;
