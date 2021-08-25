import React, { useEffect, useState } from 'react';
import './game-results.css';
import Time from "./Time";
import { GameManager } from '../useGameManager';

const GameResults = ({ seconds = 0, minutes = 0, game }: { seconds: number, minutes: number, game: GameManager }) => {
    const [isOpened, setIsOpened] = useState(game.gameOver);
    useEffect(() => {
        setIsOpened(game.gameOver);
    }, [game.gameOver]);

    if (game.gameOver && isOpened) {
        return (
            <div className="shadow">
                <div className="results">
                    <div className="close" onClick={() => setIsOpened(false)}>x</div>
                    <h2>Game Over</h2>
                    <div className="result-item">
                        <p>Points: { game.countPoints(seconds) }</p>
                    </div>
                    <div className="result-item">
                        <p>Time: <Time seconds={seconds} minutes={minutes} /></p>
                    </div>
                    <div className="result-item">
                        <p>Clicks: { game.counterClicks }</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default GameResults;
