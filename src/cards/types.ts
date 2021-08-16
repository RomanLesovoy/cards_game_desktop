export interface Card {
    image: string,
    value: string,
}

export interface CardWithState {
    image: string,
    value: string,
    opened: boolean,
}