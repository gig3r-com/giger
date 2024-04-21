import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import './locked-entry.scss';

export const LockedEntry: FC = () => {
    return (
        <div className="locked-entry">
            <span className="locked-entry__text">
                <FormattedMessage id="LOCKED_ENTRY" />
            </span>
        </div>
    );
};
