import { FC, useState } from 'react';
import { IUserSelectProps } from './user-select.model';

import './user-select.scss';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

export const UserSelect: FC<IUserSelectProps> = ({
    onValueUpdate,
    selected,
    searchString
}) => {
    const intl = useIntl();
    const [inputSelected, setInputSelected] = useState(false);
    const userSelectClasses = classNames({
        'user-select': true,
        'user-select--selected': inputSelected
    });

    return (
        <div className={userSelectClasses}>
            {selected.map((user) => (
                <span key={user.id} className="user-select__user">
                    {user.handle}
                </span>
            ))}
            <input
                type="text"
                placeholder={intl.formatMessage({
                    id: 'SEARCH'
                })}
                value={searchString}
                onFocus={() => setInputSelected(true)}
                onBlur={() => setInputSelected(false)}
                onChange={(event) => onValueUpdate(event.target.value)}
            />
        </div>
    );
};
