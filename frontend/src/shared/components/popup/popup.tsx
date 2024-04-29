import { FC } from 'react';
import { IPopupProps } from './popup.model';
import Attention from '../../../assets/chevron-left-solid.svg?react';

import './popup.scss';

export const Popup: FC<IPopupProps> = ({ type, message }) => {
    return (
        <div className="popup">
            <div className="popup__header">
                {type === 'warning' && <Attention />}
            </div>
            <div className="popup__body">
                {message}
            </div>
        </div>
    );
};
