import { useEffect, useState } from 'react';
import defaultConfig, { Config } from '../config';
import { CardWithState } from './types';
import helpers from '../helpers';
import allImages from '../allImages';

export interface GameManager {
    playGame: boolean,
    setPlayGame: Function,
    gameConfig: Config,
    gameCards: Array<CardWithState>,
    setConfig: Function,
    shuffleCards: Function,
    setCards: Function,
    restart: Function,
    addActiveCard: (card: CardWithState) => void,
    removeActiveCard: (card: CardWithState) => void,
}
export const defaultGameManager: GameManager = {
    playGame: false,
    setPlayGame: () => {},
    gameConfig: defaultConfig,
    gameCards: [],
    restart: () => {},
    shuffleCards: () => {},
    setCards: () => {},
    setConfig: () => {},
    addActiveCard: (card) => {},
    removeActiveCard: (card) => {},
}
export const activeCards: { cards: Array<CardWithState>, setCards: Function, getCards: Function } = {
    cards: [],
    getCards: function (): Array<CardWithState> {
        return this.cards;
    },
    setCards: function (cards: Array<CardWithState>) {
        this.cards = cards
    },
};

const useGameManager = (): GameManager => {
    const [gameConfig, setGameConfig] = useState(defaultGameManager.gameConfig);
    const [gameCards, setGameCards] = useState<Array<CardWithState>>(defaultGameManager.gameCards);
    const [playGame, setPlayGame] = useState<boolean>(defaultGameManager.playGame);
    const restart = () => {
        setGameCards(
            helpers.shuffle(
                helpers.withRepeat({ allImages, ...gameConfig }),
            ),
        );
    }

    useEffect(restart, [gameConfig]);

    const checkAndUpdateCards = () => {
        const coincidences = helpers.getCoincidences(activeCards.getCards(), gameConfig.repeat);
        if (coincidences.length) {
            const updatedCards = gameCards.map((card) => {
                if (coincidences.includes(card.value)) {
                    card.opened = true;
                }

                return card;
            });
            setGameCards(updatedCards);
        }
    }
    const addActiveCard = (card: CardWithState) => {
        // @ts-ignore
        activeCards.setCards([].concat(activeCards.getCards(), card));
        helpers.debounce(checkAndUpdateCards, 1000)();
    }
    const removeActiveCard = (card: CardWithState) => {
        activeCards.setCards(activeCards.getCards().filter((_card: CardWithState) => _card !== card));
    }

    return {
        playGame,
        gameConfig,
        gameCards,
        restart: restart,
        setPlayGame: setPlayGame,
        setConfig: setGameConfig,
        shuffleCards: () => setGameCards(helpers.shuffle(gameCards)),
        setCards: setGameCards,
        addActiveCard,
        removeActiveCard,
    };
}

export default useGameManager;
