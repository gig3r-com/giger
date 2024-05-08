import classNames from 'classnames';
import { FC } from 'react';
import { DecodeText } from '../decode-text/decodeText';
import GigerLogo from '../../../assets/logo-giger.svg?react';

import './loading-bar.scss';

export const LoadingBar: FC<{
    isLoading: boolean;
    text: string;
    mode?: 'cycle' | 'single';
    showLogo?: boolean;
}> = ({ isLoading, text, mode = 'single', showLogo = true }) => {
    const barClasses = classNames({
        'loading-bar__bar': true,
        'loading-bar__bar--hidden': !isLoading,
        'loading-bar__bar--cycle': mode === 'cycle',
        'loading-bar__bar--single': mode === 'single'
    });

    return (
        <div className="loading-bar">
            {showLogo && <GigerLogo />}
            <span className={barClasses}></span>
            {isLoading && (
                <div className="loading-bar__decrypting">
                    <DecodeText text={text} />
                </div>
            )}
        </div>
    );
};
