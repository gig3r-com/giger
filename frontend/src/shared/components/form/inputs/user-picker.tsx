import React, {FC, useMemo, useRef, useState,} from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { RootState } from '../../../../store/store';
import { useUserService } from "../../../services/user.service";
import { Factions } from '../../../../models/companies';
import { UserPickerProps } from './models';
import {useHashService} from "../../../services/hash.service";

export const UserPicker: FC<UserPickerProps> = ({ name }) => {
    const {
        values,
        handleBlur,
        handleChange,
    } = useFormikContext();
    const { setHash, } = useHashService();
    const intl = useIntl();
    const value = values[name];
    const users = useSelector((state: RootState) => state.users.users);
    const { currentUser } = useUserService();
    const usersWrapper = useRef<HTMLDivElement | null>(null);
    const [inputSelected, setInputSelected] = useState(!!value);
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
            .filter((user) =>
                user.handle.toLowerCase().includes(searchString.toLowerCase())
            )
            .map((user) => user.handle);
    }, [
        users,
        currentUser?.favoriteUserIds,
        currentUser?.id,
        searchString
    ]);

    const allHandles = useMemo(() => {
        const filteredFactions = Object.values(Factions).filter((faction) =>
            faction.toLowerCase().includes(searchString.toLowerCase())
        );
        return [...filteredUsers, ...filteredFactions].sort((a, b) =>
            a.localeCompare(b)
        );
    }, [filteredUsers, searchString]);

    const onFocus = () => {
        setInputSelected(true);
    }

    const onBlur = (e) => {
        setInputSelected(false);
        handleBlur(e);
    }

    const handleSelection = (handle) => {
        if (value === handle) {
            setHash(name, '')
            handleChange({target: {name, value: ''}});
        } else {
            setHash(name, handle)
            handleChange({target: {name, value: handle}});
        }
    }

    return (
        <>
            <div className={userSelectClasses}>
                { value && <span className="user-select__user">
                        {value}
                    </span>
                }
                <input
                    type="text"
                    placeholder={intl.formatMessage({
                        id: 'SEARCH'
                    })}
                    value={searchString}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(event) => setSearchString(event.target.value)}
                />
            </div>
            <div className="start-new-convo__users" ref={usersWrapper}>
                {allHandles.map(
                    (handle) => (
                        <div key={handle} className="start-new-convo__user">
                            {handle}
                            <input
                                id={handle + 'checkbox'}
                                type="checkbox"
                                onChange={() => handleSelection(handle)}
                                checked={value === handle}
                            />
                            <label htmlFor={handle + 'checkbox'}></label>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
