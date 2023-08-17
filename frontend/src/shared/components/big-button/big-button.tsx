import React from 'react';
import { IBigButtonProps } from './big-button.model';

import './big-button.scss';

export const BigButton: React.FC<IBigButtonProps> = ({
    text,
    onClick,
    color,
    disabled
}) => {
    return (
        <button
            disabled={!!disabled}
            onClick={onClick}
            className={`big-button big-button--${color}`}
        >
            <span className="big-button__text">{text}</span>
        </button>
    );
};
