import React from 'react';
import { IBigButtonProps } from './big-button.model';

import './big-button.scss';

export const BigButton: React.FC<IBigButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="big-button">
            <span className='big-button__text'>{text}</span>
        </button>
    );
};
