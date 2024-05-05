import React from 'react';
import classNames from 'classnames';
import { IBigButtonProps } from './big-button.model';
import { Loader } from '../loader/loader';

import './big-button.scss';

export const BigButton: React.FC<IBigButtonProps> = ({
    text,
    onClick,
    color,
    disabled,
    loading,
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
            {loading && <Loader />}
        </button>
    );
};
