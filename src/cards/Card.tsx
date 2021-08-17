import React, { useState } from 'react';
import { CardWithState } from './types';

interface Props {
    card: CardWithState,
    timeout: number,
    addActiveCard: (card: CardWithState) => void,
    removeActiveCard: (card: CardWithState) => void,
}
const Card = (props: Props) => {
    const {
        card,
        timeout = 3000,
        addActiveCard = () => {},
        removeActiveCard = () => {},
    } = props;
    const [opened, setOpened] = useState(card.opened);
    const open = () => {
        if (!opened) {
            setOpened(true);
            addActiveCard(card);
            setTimeout(() => {
                setOpened(false);
                removeActiveCard(card);
            }, timeout);
        }
    }

    return (
        <div className={`${opened ? 'active' : 'inactive'} flip-card`} onClick={open}>
            <div className="flip-card-inner">
                <div className="flip-card-front" />
                <div className="flip-card-back">
                    <img src={card.image} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Card;
