import React from 'react';
import Select from '../controls/select/Select';
import helpers from '../helpers';
import { configLocalStorageKeys } from '../config';
import './settings.css';
import { GameManager } from '../cards/useGameManager';

const cardsOptions = [
    { label: '8', value: 8 },
    { label: '12', value: 12 },
    { label: '16', value: 16 },
    { label: '20', value: 20 },
];

const repeatOptions = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
];

const Settings = ({ onClose = () => {}, game }: { onClose: Function, game: GameManager }) => {
    const onChange = (value: any) => (localStorageKey: string, updateConfig: Function) => {
        helpers.setLocalStorage(localStorageKey, value);
        updateConfig();
    }

    return (
        <div className="shadow">
            <div className="settings">
                <div className="close" onClick={() => onClose()}>x</div>
                <Select
                    label="Cards"
                    options={cardsOptions}
                    defaultValue={cardsOptions.find((option) => option.value === game.gameConfig.unique)}
                    onChange={(value: number) => onChange(value)(configLocalStorageKeys.unique, () => {
                        game.setConfig({ ...game.gameConfig, unique: value })
                    })}
                />
                <Select
                    label="Repeat"
                    options={repeatOptions}
                    defaultValue={repeatOptions.find((option) => option.value === game.gameConfig.repeat)}
                    onChange={(value: number) => onChange(value)(configLocalStorageKeys.repeat, () => {
                        game.setConfig({ ...game.gameConfig, repeat: value })
                    })}
                />
            </div>
        </div>
    );
}

export default Settings;
