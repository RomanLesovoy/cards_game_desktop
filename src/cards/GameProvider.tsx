import React, { ReactNode } from 'react';
import useGameManager, { defaultGameManager, GameManager } from './useGameManager';

export const GameContext = React.createContext(defaultGameManager);

const GameProvider = ({ children = null }: { children: ReactNode }) => {
    const gameManager: GameManager = useGameManager();
    return (
        <GameContext.Provider value={gameManager}>
            { children }
        </GameContext.Provider>
    );
}

export default GameProvider;
