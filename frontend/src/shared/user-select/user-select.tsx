import { FC, useMemo, useRef, useState } from 'react';
import { IUserSelectProps } from './user-select.model';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IUserBase } from '../../models/user';
import { useUserService } from '../services/user.service';

import './user-select.scss';

export const UserSelect: FC<IUserSelectProps> = ({
    onSelection,
    mode = 'single'
}) => {
    const intl = useIntl();
    const users = useSelector((state: RootState) => state.users.users);
    const { currentUser } = useUserService();
    const usersWrapper = useRef<HTMLDivElement>(null);
    const [inputSelected, setInputSelected] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<IUserBase[]>([]);
    const [searchString, setSearchString] = useState('');
    const userSelectClasses = classNames({
        'user-select': true,
        'user-select--selected': inputSelected
    });

    const filteredUsers = useMemo(() => {
        const favUsers = users.filter((user) =>
            currentUser?.favoriteUserIds.includes(user.id)
        );
        const otherUsers = users.filter(
            (user) => !currentUser?.favoriteUserIds.includes(user.id)
        );
        return [...favUsers, ...otherUsers]
            .filter((user) => user.id !== currentUser?.id)
            .filter((user) =>
                user.handle.toLowerCase().includes(searchString.toLowerCase())
            );
    }, [users, searchString]);

    const handleSelection = (user: IUserBase) => {
        if (mode === 'single') {
            setSelectedUsers(selectedUsers.includes(user) ? [] : [user]);
            onSelection([user]);
            return;
        }

        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
        onSelection(selectedUsers);
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

    return (
        <>
            <div className={userSelectClasses}>
                {selectedUsers.map((user) => (
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
                    onChange={(event) => setSearchString(event.target.value)}
                />
            </div>
            <div className="start-new-convo__users" ref={usersWrapper}>
                {filteredUsers.map((user) => (
                    <div key={user.id} className="start-new-convo__user">
                        {user.handle}
                        <input
                            id={user.id + 'checkbox'}
                            type="checkbox"
                            onChange={() => handleSelection(user)}
                            checked={selectedUsers.includes(user)}
                        />
                        <label htmlFor={user.id + 'checkbox'}></label>
                    </div>
                ))}
            </div>
        </>
    );
};
