import React from 'react';
import classNames from 'classnames';
import { IBigButtonProps } from './big-button.model';

import './big-button.scss';

export const BigButton: React.FC<IBigButtonProps> = ({
    text,
    onClick,
    color,
    disabled,
    className = ''
}) => {

    const buttonClassNames = classNames('big-button', `big-button--${color}`, className)

    return (
        <button
            disabled={!!disabled}
            onClick={onClick}
            className={buttonClassNames}
        >
            <span className="big-button__text">{text}</span>
        </button>
    );
};
