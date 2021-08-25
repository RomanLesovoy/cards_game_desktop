import { useEffect, useState } from 'react';
import defaultConfig, { Config } from '../config';
import { CardWithState } from './types';
import helpers from '../helpers';
import allImages from '../allImages';

export interface GameManager {
    playGame: boolean,
    setPlayGame: Function,
    gameConfig: Config,
    counterClicks: number,
    gameOver: boolean,
    gameCards: Array<CardWithState>,
    setConfig: Function,
    countPoints: Function,
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
    counterClicks: 0,
    gameOver: false,
    countPoints: () => {},
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
const useCounter = () => {
    const [counter, setCounter] = useState(0);

    return {
        counter,
        setCounter,
    };
}

const useGameManager = (): GameManager => {
    const [gameConfig, setGameConfig] = useState(defaultGameManager.gameConfig);
    const [gameCards, setGameCards] = useState<Array<CardWithState>>(defaultGameManager.gameCards);
    const [playGame, setPlayGame] = useState<boolean>(defaultGameManager.playGame);
    const [gameOver, setGameOver] = useState<boolean>(defaultGameManager.gameOver);
    const { counter: counterClicks, setCounter: setCounterClicks } = useCounter();

    const restart = () => {
        setPlayGame(true);
        setGameOver(false);
        setGameCards(
            helpers.shuffle(
                helpers.withRepeat({ allImages, ...gameConfig }),
            ),
        );
    }

    useEffect(restart, [gameConfig]);

    const checkAndUpdateCards = () => {
        const coincidences = helpers.getCoincidences(activeCards.getCards(), gameConfig.repeat);
        let allCardsPicked = true;
        if (coincidences.length) {
            const updatedCards = gameCards.map((card) => {
                if (coincidences.includes(card.value)) {
                    card.opened = true;
                }
                if (!card.opened) {
                    allCardsPicked = false;
                }

                return card;
            });
            if (allCardsPicked) {
                setPlayGame(false);
                setGameOver(true);
            }
            setGameCards(updatedCards);
        }
    }

    const countPoints = (timeSeconds: number) => {
        const pointsCards = (gameConfig.repeat * 1000) + (gameConfig.unique * 100);
        const minusPointsTimeAndClicks = (timeSeconds * 25) + (counterClicks * 25);

        return pointsCards - minusPointsTimeAndClicks;
    }

    const addActiveCard = (card: CardWithState) => {
        // @ts-ignore
        activeCards.setCards([].concat(activeCards.getCards(), card));
        setCounterClicks(counterClicks + 1);
        helpers.debounce(checkAndUpdateCards, 1000)();
    }

    const removeActiveCard = (card: CardWithState) => {
        activeCards.setCards(activeCards.getCards().filter((_card: CardWithState) => _card !== card));
    }

    return {
        playGame,
        gameConfig,
        gameCards,
        counterClicks,
        gameOver,
        countPoints: countPoints,
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
