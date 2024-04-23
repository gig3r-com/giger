import { FC } from 'react';

import './loader.scss';

export const Loader: FC = () => {
    return (
        <div className="loader">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-2"></div>
            <div className="cell d-3"></div>

            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
        </div>
    );
};
