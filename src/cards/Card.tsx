import React from 'react';
import { CardWithState } from './types';

interface Props {
    card: CardWithState,
}
const Card = (props: Props) => {
    return (
        <div className="card">
            <img src={props.card.image} alt=""/>
        </div>
    );
}

export default Card;
