import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import './no-access.scss';

export const NoAccess: FC = () => {
    return (
        <div className="no-access">
            <h1 className='no-access__heading'>
                <FormattedMessage id="NO_ACCESS" />
            </h1>
            <p className='no-access__description'>
                <FormattedMessage id="NO_ACCESS_DESC" />
            </p>
        </div>
    );
};
