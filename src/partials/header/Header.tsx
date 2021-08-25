import React from 'react';
import Button from '../../controls/button/Button';
import Time from '../../cards/results/Time';
import './header.css';
import { GameManager } from '../../cards/useGameManager';

interface Props {
    openSettings: Function,
    timerPause: Function,
    timerStart: Function,
    seconds: number,
    minutes: number,
    game: GameManager,
}
const Header = ({ openSettings, timerPause, timerStart, minutes, seconds, game }: Props) => {
    return (
        <header className="header">
            { game.gameOver
                ? (
                    <Button
                        onClick={game.restart}
                        value="Restart"
                    />
                )
                : (
                    <Button
                        onClick={() => {
                            game.setPlayGame(!game.playGame);
                            game.playGame ? timerPause() : timerStart();
                        }}
                        value={game.playGame ? 'Pause game' : 'Play game'}
                    />
                )
            }
            <Button
                onClick={() => openSettings(true)}
                value={'Settings'}
            />
            <Time seconds={seconds} minutes={minutes} />
        </header>
    );
}

export default Header;
