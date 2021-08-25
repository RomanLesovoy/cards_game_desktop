import React from 'react';
import helpers from '../../helpers';
import './time.css';

const Time = ({ minutes = 0, seconds = 0 }: { minutes: number, seconds: number }) => (
    <div className="timer">
        <span>
            { helpers.formatTimeWithZero(minutes) } : { helpers.formatTimeWithZero(seconds) }
        </span>
    </div>
);

export default Time;
