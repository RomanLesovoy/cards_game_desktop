import React from 'react';
import { GameContext } from './GameProvider';
import Card from './Card';

const CardsList = () => {
    return (
        <div className="cards">
            <GameContext.Consumer>
                {(game) => (
                    game.gameCards.map((card, index) => (
                        <Card key={`${card.image}${index}`} card={card} />
                    ))
                )}
            </GameContext.Consumer>
        </div>
    );
}

export default CardsList;
