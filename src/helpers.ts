import { CardWithState } from './cards/types';

interface WithRepeatProps {
    allImages: Array<string>,
    repeat: number,
    unique: number,
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
}
