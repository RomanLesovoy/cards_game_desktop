import React from 'react';
import './button.css';

interface Props {
    onClick: Function,
    value: string,
    disabled?: boolean,
    className?: string,
}
const Button = (props: Props) => {
    const {
        onClick = () => {},
        value = '',
        disabled = false,
        className = '',
    } = props;

    return (
        <button
            className={`${className} button`}
            disabled={disabled}
            onClick={(e) => onClick(e)}
        >
            { value }
        </button>
    )
}

export default React.memo(Button);
