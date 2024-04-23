import React from 'react';
import classNames from 'classnames';
import { IBigButtonProps } from './big-button.model';

import './big-button.scss';
import { Loader } from '../loader/loader';

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
