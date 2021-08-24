import React, { useState, useRef, useEffect } from 'react';
import './select.css';

interface Props {
    onChange: Function,
    options: Array<{ value: any, label: string }>,
    label: string,
    defaultValue?: any,
    className?: string,
}
const Select = (props: Props) => {
    const {
        onChange = () => {},
        options = [],
        label = '',
        defaultValue = props.options[0],
        className = '',
    } = props;
    const [isOpened, setIsOpened] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handlerClickOutside = (e: any) => {
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpened(false);
            }
        }
        document.addEventListener('mousedown', handlerClickOutside);

        return () => document.removeEventListener('mousedown', handlerClickOutside);
    }, []);

    const renderOptions = () => options.filter((option) => option !== defaultValue).map((option) => (
        <div
            className="option"
            key={`${option.value}${option.label}`}
            onClick={() => onChange(option.value)}
        >
            { option.label }
        </div>
    ));

    return (
        <div className={`select-block ${isOpened ? 'opened' : ''}`} ref={wrapperRef}>
            <div className="select-label">{ label }</div>
            <div
                onClick={() => setIsOpened(!isOpened)}
                className={`${className} select`}
            >
                { defaultValue.value }
                { isOpened && (
                    <div className="options">
                        { renderOptions() }
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(Select);
