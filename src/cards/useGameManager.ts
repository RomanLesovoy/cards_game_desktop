import { useEffect, useState } from 'react';
import defaultConfig, { Config } from '../config';
import { CardWithState } from './types';
import helpers from '../helpers';
import allImages from '../allImages';

export interface GameManager {
    gameConfig: Config,
    gameCards: Array<CardWithState>,
    shuffleCards: Function,
    setCards: Function,
    setConfig: Function,
}
export const defaultGameManager: GameManager = {
    gameConfig: defaultConfig,
    gameCards: [],
    shuffleCards: () => {},
    setCards: () => {},
    setConfig: () => {},
}
const useGameManager = (): GameManager => {
    const [gameConfig, setGameConfig] = useState(defaultConfig);
    const [gameCards, setGameCards] = useState<Array<CardWithState>>([]);
    useEffect(() => {
        setGameCards(
            helpers.shuffle(
                helpers.withRepeat({ allImages, ...gameConfig }),
            ),
        );
    }, [gameConfig]);
    const shuffleCards = () => {
        setGameCards(helpers.shuffle(gameCards));
    }
    const setCards = (cards: Array<CardWithState>) => {
        setGameCards(cards);
    }
    const setConfig = (config: Config) => {
        setGameConfig(config);
    }

    return {
        gameConfig,
        gameCards,
        shuffleCards,
        setCards,
        setConfig,
    };
}

export default useGameManager;
