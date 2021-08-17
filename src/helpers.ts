import { CardWithState } from './cards/types';

interface WithRepeatProps {
    allImages: Array<string>,
    repeat: number,
    unique: number,
}
interface ChosenAll {
    cards: Array<CardWithState>,
    currentCard: CardWithState,
    repeat: number,
}

export default {
    shuffle: (array: Array<any>) => array.sort(() => Math.random() - 0.5),
    withRepeat: function ({ allImages, repeat, unique }: WithRepeatProps): Array<CardWithState> {
        if (allImages.length < unique) {
            throw new Error('Not enough images');
        }
        const withRepeatImages = [];
        const imagesForRepeat = allImages.slice(0, unique - 1);
        for (let i = 0; i < repeat; i++) {
            withRepeatImages.push(...imagesForRepeat);
        }

        return withRepeatImages.map((image) => ({
            image: image,
            value: image,
            opened: false,
        }));
    },
    chosenAll: ({ cards = [], currentCard, repeat }: ChosenAll) => {
      const filtered = cards.filter((card) => card.value === currentCard.value);

      return cards.length && filtered?.length === repeat;
    },
    getCoincidences: function (cards: Array<CardWithState>, repeat: number) {
        const coincidences: Array<string> = [];
        cards.map((card: CardWithState) => {
            const filtered = this.chosenAll({ cards, currentCard: card, repeat });
            if (filtered && !coincidences.includes(card.value)) {
                coincidences.push(card.value);
            }
        });

        return coincidences;
    },
    debounce: function (func: Function, wait: number, immediate: boolean = false) {
        let timeout: any;

        return function executedFunction() {
            // @ts-ignore
            const context = this;
            const args = arguments;

            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    },
}
