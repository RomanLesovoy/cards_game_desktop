import React from 'react';
import { GameContext } from './GameProvider';
import Card from './Card';
import './cards.css';

const CardsList = () => {
    return (
        <div className="cards">
            <GameContext.Consumer>
                {(game) => (
                    game.gameCards.map((card, index) => (
                        <Card
                            key={`${card.image}${index}${card.opened}`}
                            card={card}
                            timeout={game.gameConfig.openedTimeout}
                            addActiveCard={game.addActiveCard}
                            removeActiveCard={game.removeActiveCard}
                        />
                    ))
                )}
            </GameContext.Consumer>
        </div>
    );
}

export default CardsList;
