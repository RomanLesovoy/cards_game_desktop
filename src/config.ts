import helpers from './helpers';

export const configLocalStorageKeys = {
    unique: 'uniqueKey',
    repeat: 'repeatKey',
    openedTimeout: 'openedTimeoutKey',
}

export interface Config {
    repeat: number,
    unique: number,
    openedTimeout: number,
}

export default {
    repeat: Number(helpers.getFromLocalStorage(configLocalStorageKeys.repeat) || 2),
    unique: Number(helpers.getFromLocalStorage(configLocalStorageKeys.unique) || 20),
    openedTimeout: Number(helpers.getFromLocalStorage(configLocalStorageKeys.openedTimeout) || 3000),
};
