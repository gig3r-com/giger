import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { IUserSelectProps } from './user-select.model';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useUserService } from '../services/user.service';

import './user-select.scss';
import { Factions } from '../../models/companies';

export const UserSelect: FC<IUserSelectProps> = ({
    onSelection,
    mode = 'single',
    allowFindingSelf = false,
    includeFactions
}) => {
    const intl = useIntl();
    const users = useSelector((state: RootState) => state.users.users);
    const { currentUser } = useUserService();
    const usersWrapper = useRef<HTMLDivElement>(null);
    const [inputSelected, setInputSelected] = useState(false);
    const [selectedHandles, setSelectedHandles] = useState<string[]>([]);
    const [searchString, setSearchString] = useState('');
    const userSelectClasses = classNames({
        'user-select': true,
        'user-select--selected': inputSelected
    });

    const filteredUsers = useMemo(() => {
        const favUsers = allowFindingSelf
            ? users
            : users.filter((user) =>
                  currentUser?.favoriteUserIds.includes(user.id)
              );
        const otherUsers = allowFindingSelf
            ? users
            : users.filter(
                  (user) => !currentUser?.favoriteUserIds.includes(user.id)
              );
        return [...favUsers, ...otherUsers]
            .filter((user) => user.id !== currentUser?.id)
            .filter((user) =>
                user.handle.toLowerCase().includes(searchString.toLowerCase())
            )
            .map((user) => user.handle);
    }, [users, searchString]);

    const allHandles = useMemo(() => {
        return [...filteredUsers, ...Object.values(Factions)];
    }, [filteredUsers]);

    const handleSelection = (handle: string) => {
        if (mode === 'single') {
            setSelectedHandles(
                selectedHandles.includes(handle) ? [] : [handle]
            );
            return;
        }

        if (selectedHandles.includes(handle)) {
            setSelectedHandles(selectedHandles.filter((u) => u !== handle));
        } else {
            setSelectedHandles([...selectedHandles, handle]);
        }
        adjustContainerSize();
    };

    const adjustContainerSize = () =>
        setTimeout(() => {
            if (!usersWrapper.current) {
                return;
            }
            const inputHeight =
                document.querySelector('.user-select')?.clientHeight;

            if (inputHeight) {
                usersWrapper.current.style.height = `calc(100vh - ${
                    inputHeight + 210
                }px`;
            }
        }, 0);

    useEffect(
        function emitSelectionChange() {
            onSelection(selectedHandles);
        },
        [selectedHandles]
    );

    return (
        <>
            <div className={userSelectClasses}>
                {selectedHandles.map((handle) => (
                    <span key={handle} className="user-select__user">
                        {handle}
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
                    onChange={(event) => setSearchString(event.target.value)}
                />
            </div>
            <div className="start-new-convo__users" ref={usersWrapper}>
                {(includeFactions ? allHandles : filteredUsers).map(
                    (handle) => (
                        <div key={handle} className="start-new-convo__user">
                            {handle}
                            <input
                                id={handle + 'checkbox'}
                                type="checkbox"
                                onChange={() => handleSelection(handle)}
                                checked={selectedHandles.includes(handle)}
                            />
                            <label htmlFor={handle + 'checkbox'}></label>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
