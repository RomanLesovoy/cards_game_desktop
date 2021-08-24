import { CardWithState } from './cards/types';
import { allBackgrounds } from './allImages';

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
    shuffle: function (array: Array<any>) {
        return array.sort(() => Math.random() - 0.5);
    },
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
    chosenAll: function ({ cards = [], currentCard, repeat }: ChosenAll) {
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
    getGameBg: function() {
        return this.shuffle(allBackgrounds).pop();
    },
    setCssVar: function(key: string, value: any) {
        const root = document.documentElement;
        root.style.setProperty(key, value);
    },
    setLocalStorage: function (key: string, value: any) {
        if (typeof value === 'object' || Array.isArray(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    getFromLocalStorage: function(key: string) {
        let result;
        const storageItem = localStorage.getItem(key) || ''
        try {
            result = JSON.parse(storageItem);
        } catch {
            result = storageItem;
        }

        return result;
    },
    formatTimeWithZero: function (value: number) {
      if (value < 10) {
          return `0${value}`;
      }

      return value;
    },
}
